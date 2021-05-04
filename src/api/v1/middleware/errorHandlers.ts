import { ErrorRequestHandler, RequestHandler } from "express";
import { getTranslation } from "@services/i18n";
import ErrorResponse from "@utils/errorResponse";
import config from "@config";

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404);
  return next(new Error("Error 404"));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let handled = false;
  let error = { ...err };
  error.message = err.message;

  const { ip, query, method, originalUrl } = req;
  const metadata = { ip, method, query, url: originalUrl };

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404, metadata);

    const i18nErrMessage = getTranslation(req, message, "errors:errCast");
    error.message = i18nErrMessage;
    handled = true;
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    // const message = Object.values(err.errors).map(val => val.message).join(",").toString();
    const message = "Validation Error";
    error = new ErrorResponse(message, 400, metadata);

    const i18nErrMessage = getTranslation(req, message, "errors:errValidation");
    error.message = i18nErrMessage;
    handled = true;
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400, metadata);

    const i18nErrMessage = getTranslation(req, message, "errors:err11000");
    error.message = i18nErrMessage;
    handled = true;
  }

  if (res.statusCode === 404) {
    const message = `Route Not Found: ${originalUrl}`;
    error = new ErrorResponse(message, 404, metadata);

    const i18nErrMessage = getTranslation(req, message, "errors:err404");
    error.message = i18nErrMessage;
    handled = true;
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (!handled || !error.message) {
    const message = error.message ?? "Internal Server Error";

    error = new ErrorResponse(message, statusCode, metadata);
    error.message = getTranslation(req, message, "errors:err500");
  }

  res.status(statusCode);
  return res.json({
    success: false,
    message: error.message,
    stack: config.isDev ? err.stack : null
  });
};
