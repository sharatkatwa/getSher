import AuthService from "./auth.service.js"
import env from "../../../config/env.js"
import { app_config } from "../../../constants/app.constant.js"
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js"
import { StatusCodes } from "http-status-codes";

const usesSecureCookies =
    env.NODE_ENV === "production" || env.REDIRECT_URL?.startsWith("https://");

const getCookieOptions = (options) => ({
    ...options,
    sameSite: usesSecureCookies ? "none" : "lax",
    secure: usesSecureCookies,
});

const accessTokenCookieOptions = () => getCookieOptions(app_config.cookie.accessToken);
const refreshTokenCookieOptions = () => getCookieOptions(app_config.cookie.refreshToken);

export default class AuthController {
    constructor() {
        this.userService = new AuthService()
    }

    async GoogleCallBack(req, res) {
        // console.log(req.user);


        const { accessToken, refreshToken } = await this.userService.CreateUser(req.user)

        res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions())

        res.cookie('accessToken', accessToken, accessTokenCookieOptions())
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

        res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions())

        res.cookie('accessToken', accessToken, accessTokenCookieOptions())
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

        res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions())

        res.cookie('accessToken', accessToken, accessTokenCookieOptions())
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

        res.cookie('accessToken', accessToken, accessTokenCookieOptions())

        return buildSuccessResponse(
            res,
            "accessToken fetched successfuly",
            StatusCodes.OK,
            accessToken
        );
    }

    async LogoutController(req, res) {

        await this.userService.LogoutService(req.cookies);

        res.clearCookie("accessToken", accessTokenCookieOptions());
        res.clearCookie("refreshToken", refreshTokenCookieOptions());

        return buildSuccessResponse(
            res,
            "Logged out successfully"
        );
    }
}
