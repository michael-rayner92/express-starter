import express from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import config from "@config";

const { isDev, sentry } = config;
const { dsn, environment, release } = sentry;

// @@Resource
// @@Link https://docs.sentry.io/platforms/node/guides/express

const sentryLoader = (app: express.Application): void => {
  Sentry.init({
    dsn,
    debug: isDev,
    release,
    environment,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
      new Tracing.Integrations.Mongo()
    ],
    tracesSampleRate: isDev ? 1.0 : 0.25
  });

  app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
  app.use(Sentry.Handlers.tracingHandler());

  // Test Sentry Setup
  // app.get("/debug-sentry", function mainHandler(req, res) {
  //   throw new Error("My first Sentry error!");
  // });
};

export default sentryLoader;
