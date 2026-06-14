import { UnauthorizedError } from "../shared/error/custom.errors.js"
import jwt from 'jsonwebtoken'
import env from '../config/env.js'

export const authenticateMiddleware = (req,res,next) =>{
    try {
        const token =  req.cookies.accessToken

        if (!token) {
            throw new UnauthorizedError("Token not found")
        }

        const payload = jwt.verify(token,env.ACCESS_TOKEN_SECRET)
        req.user = payload
        
        next()
    } catch (error) {
        if(error.name === 'TokenExpiredError')
            throw new UnauthorizedError('Access token expired!')
        throw new UnauthorizedError('Token not found')
    }
}

export const authorizeRole = (role) =>{
    return (req,res,next)=>{
        if(role.includes(req.user.role))
            next()
        else
            throw new UnauthorizedError('Unauthorized access')
    }
}
