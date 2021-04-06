import express from "express";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";
import config from "@config";

const i18nLoader = (app: express.Application): void => {
  i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      backend: {
        loadPath: "src/locales/{{lng}}/{{ns}}.json",
        addPath: "src/locales/{{lng}}/{{ns}}.missing.json"
      },
      detection: {
        order: ["querystring", "cookie"],
        caches: ["cookie"]
      },
      debug: config.isDev,
      saveMissing: config.isDev,
      fallbackLng: "en",
      defaultNS: "common",
      fallbackNS: "common",
      preload: ["en", "de", "fr", "nl"],
      ns: ["common", "errors", "glossary", "validation"]
    });

  app.use(i18nextMiddleware.handle(i18next, { ignoreRoutes: [] }));
};

export default i18nLoader;
