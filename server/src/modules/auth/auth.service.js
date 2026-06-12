// import UserRepo from "" imposr karna hai 
import jwt from 'jsonwebtoken'
import { app_config } from '../../constants/app.constant.js';
import env from '../../config/env.js'


export default class AuthService {
    constructor(){
       this.userRepo = new UserRepo() 
    }

  async CreateUser(user) {
    const isUserPresent = await this.userRepo.findByEmail(user.emails[0].value)
    let result = isUserPresent;

       if(!isUserPresent){
         const _user = await this.userRepo.create({
            email:user.emails[0].value,
            picture:user.photos[0].value,
            name:user.displayName
        })
        result = _user
       }

       const refreshToken = jwt.sign({id:result._id},env.REFRESH_TOKEN_SERCRET,app_config.jwt.refreshToken)

       const accessToken= jwt.sign({id:result._id},env.ACCESS_TOKEN_SERCRET,app_config.jwt.accessToken)


    }
}