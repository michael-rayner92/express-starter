import { RequestHandler } from "express";
import Logger from "@utils/logger";
import sendEmail from "@utils/mailer";
import ErrorResponse from "@helpers/errorResponse";
import asyncHandler from "@middleware/asyncHandler";
import redisClient from "@utils/cache";

// Test Logs
const LOGGER_DEMO = true;
const LOCALES_DEMO = true;
const LOGS = false;

/**
 * @async
 * @route GET /api/v1/test
 * @access Public
 * @category Test Routes
 * @description Test Logging and Internationalisation
 */
export const testRoute = asyncHandler(async (req, res) => {
  if (LOGS && LOGGER_DEMO) {
    Logger.error("This is an error log", { env: "development" });
    Logger.warn("This is a warn log");
    Logger.info("This is a info log", { env: "random metadata" });
    Logger.http("This is a http log");
    Logger.verbose("This is a verbose log");
    Logger.debug("This is a debug log");
    Logger.silly("This is a silly log");
  }

  // i18n Utils
  if (LOGS && LOCALES_DEMO) {
    // req.i18n.changeLanguage("nl");

    // Basic using default translation ns
    // const exists = req.i18n.exists("init");
    // const translation = req.t("init");

    // Select different ns - errors
    const translation = req.t("errors:err404");
    const exists = req.i18n.exists("errors:err404");

    // const errNamespace = req.i18n.getFixedT([req.language, "en"], "errors");
    // const translation = errNamespace("requiredFieldMissing");
    // const exists = true;

    if (exists) Logger.debug(`Translation: ${translation}`);
    else Logger.debug(`Translation not found`);
  }

  res.status(200).send({ message: "Success" });
});

/**
 * @async
 * @route GET /api/v1/test/async
 * @access Public
 * @category Test Routes
 * @description Throw an asynchronous error
 */
export const testAsyncRoute = asyncHandler(async (req, res) => {
  throw new Error("You broke me asynchronously!!!!");
});

/**
 * @route GET /api/v1/test/error
 * @access Public
 * @category Test Routes
 * @description Throw a synchronous error
 */
export const testErrorRoute: RequestHandler = (req, res) => {
  throw new Error("You broke me!!!!");
};

/**
 * @async
 * @route GET /api/v1/test/throw
 * @access Public
 * @category Test Routes
 * @description Throw a generic error
 */
export const testThrowRoute: RequestHandler = asyncHandler(
  async (req, res, next) => {
    return next(new ErrorResponse("Throw generic error", 500));
  }
);

/**
 * @async
 * @route GET /api/v1/test/send-email
 * @access Public
 * @category Test Routes
 * @description Send an email to a hard coded email address
 */
export const testSendEmail = asyncHandler(async (req, res) => {
  await sendEmail({
    sendTo: "example@example.com",
    type: "Test",
    data: {}
  });

  Logger.silly("Email Should Have Sent!");
  res.status(200).json({ success: true, message: "Email Sent!" });
});

/**
 * @async
 * @route GET /api/v1/test/redis/:key
 * @access Public
 * @category Test Routes
 * @description Test redis cache functionality
 */
export const testRedisRoute = asyncHandler(async (req, res) => {
  const cacheValue = await redisClient.useCache(req.params.key);

  if (cacheValue) Logger.debug(cacheValue);
  else Logger.debug("No cached value found");

  const message = cacheValue ? "Cache value found" : "Cache value not found";
  res.status(200).json({ success: true, message });
});
