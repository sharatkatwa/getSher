import { validationResult } from "express-validator";
import { ValidationError } from "../shared/error/custom.errors.js";

export const validateErrors = (req, res, next) => {
// 
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
      // Convert express-validator results into the app's shared error shape.
      const errorMessages = errors.array().map(err => err.msg)
      throw new ValidationError("Invalid Request", errorMessages.join(' | '))

    }
    
    next()
};
