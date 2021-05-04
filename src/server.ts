import path from "path";
import express from "express";
import favicon from "serve-favicon";
import gracefulShutdown from "http-graceful-shutdown";
import config from "@config";
import loaders from "@loaders";
import Logger from "@services/logger";
import exitOptions from "@config/exitOptions";

const { env, port } = config;
const serverActiveMsg = `Server running in ${env} mode on port ${port}`;

const startServer = async () => {
  const app: express.Application = express();

  app.use(favicon(path.join(__dirname, "../public", "favicon.ico")));
  // app.use(express.static(path.join(__dirname, "../public")));

  loaders(app);
  // Add if asynchronous
  // try {
  // } catch (err) {
  // Logger.error("Failed to load express server");
  // }

  app
    .listen(port, () => Logger.info(serverActiveMsg))
    .on("error", err => {
      Logger.error(`Server failed with ${err}`);
      process.exit(1);
    });

  // Application specific logging, throwing an error, or other logic here
  process.on("unhandledRejection", (reason, promise) => {
    Logger.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
  });

  gracefulShutdown(app, exitOptions);
};

startServer();
