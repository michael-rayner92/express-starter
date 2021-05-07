import express from "express";
import morgan from "morgan";
import config from "@config";
import Logger from "@utils/logger";

const format = "tiny"; // "dev" | "tiny"
const stream: morgan.StreamOptions = {
  write: message => Logger.http(message)
};

const initLogger = (app: express.Application): void => {
  app.use(morgan(format, { stream, skip: () => !config.isDev }));
};

export default initLogger;
