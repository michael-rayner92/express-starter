import express from "express";
import * as Sentry from "@sentry/node";
import { errorHandler, notFound } from "@middleware/errorHandlers";

const errorHandlersLoader = (app: express.Application): void => {
  app.use(notFound);
  app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
  app.use(errorHandler);
};

export default errorHandlersLoader;
