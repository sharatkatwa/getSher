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
        // console.log(req.user);


        const { accessToken, refreshToken } = await this.userService.CreateUser(req.user)

        res.cookie('refreshToken', refreshToken, app_config.cookie.refreshToken)

        res.cookie('accessToken', accessToken, app_config.cookie.accessToken)
        // console.log(req.user);
        res.redirect(env.REDIRECT_URL);
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
        const { user, accessToken, refreshToken } = await this.userService.LoginUser(req.body)

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

    async GetMe(req, res) {
        let user = await this.userService.GetMeService(req.user)

        return buildSuccessResponse(
            res,
            "fetched user successfuly",
            StatusCodes.OK,
            user
        );

    }

    async RefreshTokenController(req, res) {
        let accessToken = await this.userService.RefreshTokenService(req.cookies)

        res.cookie('accessToken', accessToken, app_config.cookie.accessToken)

        return buildSuccessResponse(
            res,
            "accessToken fetched successfuly",
            StatusCodes.OK,
            accessToken
        );
    }

    async LogoutController(req, res) {

        await this.userService.LogoutService(req.cookies);

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return buildSuccessResponse(
            res,
            "Logged out successfully"
        );
    }
}