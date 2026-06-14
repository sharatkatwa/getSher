import { StatusCodes } from "http-status-codes";

const ErrorHandler = (err, req, res, next) => {
  const errorResponse = { success: false };
  if (err.details) errorResponse.details = err.details;
  if (err.message) errorResponse.message = err.message;
  res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorResponse);
};

export default ErrorHandler;
