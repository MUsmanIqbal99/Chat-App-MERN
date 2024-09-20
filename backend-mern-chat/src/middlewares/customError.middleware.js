import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let { statusCode, message, errors } = err;

  if (!(err instanceof ApiError)) {
    statusCode = statusCode || 500;
    message = message || 'Internal Server Error';
    errors = [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export { errorHandler };
