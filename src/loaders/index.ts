import express from "express";
import cors from "cors";
import loadi18n from "@loaders/loadi18n";
import corsOptions from "@config/corsOptions";
import "colors";

const startServer = async (app: express.Application): Promise<void> => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cors(corsOptions));

  loadi18n(app);

  app.get("/", (req, res) => {
    console.log("ROUTE WORKS!");
    console.log("LANGUAGE HEADER: ", req.language);
    console.log("LANGUAGES HEADER: ", req.languages);
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

    if (exists) console.log(`Translation: ${translation}`);
    else console.log(`Translation not found`);

    res.status(200).send({ message: "Success" });
  });
};

export default startServer;