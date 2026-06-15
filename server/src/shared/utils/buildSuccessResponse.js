import { StatusCodes } from "http-status-codes";

export const buildSuccessResponse = (res, message, statusCode, data) => {
  const response = {
    success: true,
  };
  if (message) response.message = message;
  if (data) response.data = data;
  
  res.status(statusCode || StatusCodes.OK).json(response);
};
