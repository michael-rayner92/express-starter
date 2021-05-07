import express from "express";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import config from "@config";

const localesDir = "src/api/v1/locales";

const initi18n = (app: express.Application): void => {
  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      backend: {
        loadPath: `${localesDir}/{{lng}}/{{ns}}.json`,
        addPath: `${localesDir}/{{lng}}/{{ns}}.missing.json`
      },
      detection: {
        order: ["querystring", "cookie"],
        caches: ["cookie"]
      },
      // debug: config.isDev,
      saveMissing: config.isDev,
      fallbackLng: "en",
      defaultNS: "common",
      fallbackNS: "common",
      preload: ["en", "nl"], // @@todo "de", "fr"
      ns: ["common", "errors", "glossary", "validation"]
    });

  app.use(i18nextMiddleware.handle(i18next, { ignoreRoutes: [] }));
};

export default initi18n;
