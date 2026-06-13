import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  constructor(message, statusCode, details = "") {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", details = "") {
    super(message, StatusCodes.NOT_FOUND, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", details = "") {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details = "") {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}
