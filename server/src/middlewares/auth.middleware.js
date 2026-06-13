import { UnauthorizedError } from "../shared/error/custom.errors.js"
import jwt from 'jsonwebtoken'
import env from '../config/env.js'

export const authenticateMiddleware = (req,res,next) =>{
    try {
        const token =  req.cookies.accessToken
        const payload = jwt.verify(token,env.ACCESS_TOKEN_SECRET)
        req.user = payload
        
        next()
    } catch (error) {
        if(error.name === 'TokenExpiredError')
            throw new UnauthorizedError('Access token expired!')
        throw new UnauthorizedError('TOken not found')
    }
}

export const authorizeRoles = (role) =>{
    return (req,res,next)=>{
        if(role.includes(req.user.role))
            next()
        else
            throw new UnauthorizedError('Unauthorized access')
    }
}