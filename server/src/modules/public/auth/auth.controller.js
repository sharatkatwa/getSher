import AuthService from "./auth.service.js"
import env from "../../../config/env.js"
import { app_config } from "../../../constants/app.constant.js"
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js"
import { StatusCodes } from "http-status-codes";


export default class AuthController {
    constructor() {
        this.userService = new AuthService()
    }

    async GoogleCallBack(req, res) {

        const { accessToken, refreshToken } = await this.userService.CreateUser(req.user)

        res.cookie('refreshToken', refreshToken, app_config.cookie.refreshToken)

        res.cookie('accessToken', accessToken, app_config.cookie.accessToken)
        // console.log(req.user);
        return buildSuccessResponse(
            res,
            "Login successful",
            StatusCodes.OK,
            req.user
        );

    }

    async Register(req, res) {
        const { user, accessToken, refreshToken } = await this.userService.RegisterUser(req.body)

        res.cookie('refreshToken', refreshToken, app_config.cookie.refreshToken)

        res.cookie('accessToken', accessToken, app_config.cookie.accessToken)
        // console.log(req.user);
        return buildSuccessResponse(
            res,
            "User registered successfully",
            StatusCodes.CREATED,
            user
        );
    }

    async Login(req, res) {
        const {user, accessToken, refreshToken } = await this.userService.LoginUser(req.body)
        console.log(user);
        

        res.cookie('refreshToken', refreshToken, app_config.cookie.refreshToken)

        res.cookie('accessToken', accessToken, app_config.cookie.accessToken)
        // console.log(req.user);

        return buildSuccessResponse(
            res,
            "Login successful",
            StatusCodes.OK,
            user
        );

    }
}