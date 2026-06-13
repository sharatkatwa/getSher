import UserRepo from "../../../repository/user.repository.js"
import jwt from 'jsonwebtoken'
import { app_config } from '../../../constants/app.constant.js';
import env from '../../../config/env.js'


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
}