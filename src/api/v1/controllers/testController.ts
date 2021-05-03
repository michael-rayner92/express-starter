import { RequestHandler } from "express";
import Logger from "@services/logger";
import sendEmail from "@services/mailer";
import ErrorResponse from "@utils/errorResponse";
import asyncHandler from "@middleware/asyncHandler";

// Test Logs
const LOGGER_DEMO = true;
const LOCALES_DEMO = true;
const LOGS = false;

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

export const testAsyncRoute = asyncHandler(async (req, res) => {
  throw new Error("You broke me asynchronously!!!!");
});

export const testErrorRoute: RequestHandler = (req, res) => {
  throw new Error("You broke me!!!!");
};

export const testThrowRoute: RequestHandler = asyncHandler(
  async (req, res, next) => {
    return next(new ErrorResponse("Throw generic error", 500));
  }
);

export const testSendEmail = asyncHandler(async (req, res) => {
  await sendEmail({
    sendTo: "example@example.com",
    type: "Test",
    data: {}
  });

  Logger.silly("Email Should Have Sent!");
  res.status(200).json({ success: true, message: "Email Sent!" });
});
