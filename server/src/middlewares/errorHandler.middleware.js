import {StatusCodes} from  'http-status-codes'

const ErrorHandler  = (err,req, res, next)=>{

    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:err.message || 'internal server error',
        success:false
    })
    
}

export default ErrorHandler