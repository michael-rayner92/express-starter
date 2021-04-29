import express from "express";
import { errorHandler, notFound } from "@middleware/errorHandlers";

const errorHandlersLoader = (app: express.Application): void => {
  app.use(notFound);
  app.use(errorHandler);
};

export default errorHandlersLoader;
