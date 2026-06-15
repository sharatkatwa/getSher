import UserRepo from "../../../repository/user.repository.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { app_config } from '../../../constants/app.constant.js';
import env from '../../../config/env.js'
import { ConflictError, UnauthorizedError, ValidationError } from "../../../shared/error/custom.errors.js";
import logger from '../../../config/logger.js'


export default class AuthService {
   constructor() {
      this.userRepo = new UserRepo()
   }

   async CreateUser(user) {
      const isUserPresent = await this.userRepo.findByEmail(user.emails[0].value)
      let result = isUserPresent;

      if (!isUserPresent) {
         const _user = await this.userRepo.create({
            email: user.emails[0].value,
            picture: user.photos[0].value,
            name: user.displayName
         })
         result = _user
      }

      let data = {
         id: result._id,
         email: user.emails[0].value,
         picture: user.photos[0].value,
         role: result.role,
         name: user.displayName
      }

      const refreshToken = jwt.sign(data, env.REFRESH_TOKEN_SECRET, app_config.jwt.refreshToken)

      const accessToken = jwt.sign(data, env.ACCESS_TOKEN_SECRET, app_config.jwt.accessToken)

      return {
         refreshToken,
         accessToken,
      }
   }

   async RegisterUser(data) {
      if (!data.name || !data.email || !data.password) {
         throw new ValidationError('All fields are Required')
      }

      const isUserPresent = await this.userRepo.findByEmail(data.email)


      if (isUserPresent) {
         throw new ConflictError("Email Already Registred")
      }

      let hassPass = bcrypt.hashSync(data.password, 10)

      let user = await this.userRepo.create({
         name: data.name,
         email: data.email,
         password: hassPass,
      })


      let userInfoForToken = {
         id: user._id,
         email: user.emails,
         picture: user.photos,
         role: user.role,
         name: user.displayName
      }

      const refreshToken = jwt.sign(userInfoForToken, env.REFRESH_TOKEN_SECRET, app_config.jwt.refreshToken)

      const accessToken = jwt.sign(userInfoForToken, env.ACCESS_TOKEN_SECRET, app_config.jwt.accessToken)

      return {
         user,
         refreshToken,
         accessToken,
      }
   }

   async LoginUser(data) {
      if (!data.email || !data.password) {
         throw new ValidationError('All fields are Required')
      }

      const user = await this.userRepo.findByEmail(data.email)

      if (!user) {
         throw new ConflictError("Email Not Found")
      }

      let hassPass = bcrypt.compareSync(data.password, user.password)

      if (!hassPass) {
         throw new UnauthorizedError('Invalid Credentials')
      }

      let userInfoForToken = {
         id: user._id,
         email: user.emails,
         picture: user.photos,
         role: user.role,
         name: user.displayName
      }

      const refreshToken = jwt.sign(userInfoForToken, env.REFRESH_TOKEN_SECRET, app_config.jwt.refreshToken)

      const accessToken = jwt.sign(userInfoForToken, env.ACCESS_TOKEN_SECRET, app_config.jwt.accessToken)

      return {
         user,
         refreshToken,
         accessToken,
      }
   }

   async GetMeService(data) {
      let user = await this.userRepo.findById(data.id)
      console.log(user)
      if (!user) {
         throw new UnauthorizedError('Invalid request')
      }
      return user
   }

   async RefreshTokenService(data) {
      let refreshToken = data.refreshToken

      if (!refreshToken) {
         throw new UnauthorizedError('Session expired')
      }

      let decode = await jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET)

      let user = await this.userRepo.findById(decode.id)

      if (!decode) {
         throw new UnauthorizedError('Invalid Token')
      }

      let userInfoForToken = {
         id: user._id,
         email: user.emails,
         picture: user.photos,
         role: user.role,
         name: user.displayName
      }
      const accessToken = jwt.sign(userInfoForToken, env.ACCESS_TOKEN_SECRET, app_config.jwt.accessToken)

      return accessToken

   }

   async LogoutService(data){
      let { accessToken , refreshToken} = data

      
   }
}