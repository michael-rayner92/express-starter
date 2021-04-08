import express from "express";
import Logger from "@config/logOptions";
import loadi18n from "@loaders/loadi18n";
import loadLogger from "@loaders/loadLogger";
import loadExpress from "@loaders/loadExpress";
import loadSecurity from "@loaders/loadSecurity";
import "colors";

const startServer = async (app: express.Application): Promise<void> => {
  await loadExpress(app);

  loadSecurity(app);
  loadLogger(app);
  loadi18n(app);

  app.get("/", (req, res) => {
    // Logger.error("This is an error log", { env: "development" });
    // Logger.warn("This is a warn log");
    // Logger.info("This is a info log", { env: "random metadata" });
    // Logger.http("This is a http log");
    // Logger.verbose("This is a verbose log");
    // Logger.debug("This is a debug log");
    // Logger.silly("This is a silly log");

    // i18n Utils
    // req.i18n.changeLanguage("nl");

    // Basic using default translation ns
    // const exists = req.i18n.exists("init");
    // const translation = req.t("init");

    // Select different ns - errors
    const translation = req.t("errors:notFound");
    const exists = req.i18n.exists("errors:notFound");

    // const errNamespace = req.i18n.getFixedT([req.language, "en"], "errors");
    // const translation = errNamespace("requiredFieldMissing");
    // const exists = true;

    if (exists) Logger.debug(`Translation: ${translation}`);
    else Logger.debug(`Translation not found`);

    res.status(200).send({ message: "Success" });
  });
};

export default startServer;
