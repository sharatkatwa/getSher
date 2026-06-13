import AuthService from "./auth.service.js"
import env from "../../../config/env.js" 
import { app_config } from "../../../constants/app.constant.js"


export default class AuthController {
    constructor() {
        this.userService = new AuthService()
    }

    async GoogleCallBack(req,res) {

        const {accessToken,refreshToken} = await this.userService.CreateUser(req.user)

        res.cookie('refreshToken',refreshToken,app_config.cookie.refreshToken)

         res.cookie('accessToken',accessToken,app_config.cookie.accessToken)
        // console.log(req.user);
        res.json({
            data:req.user
        })
        
    }
}