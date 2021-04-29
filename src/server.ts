import path from "path";
import express from "express";
import favicon from "serve-favicon";
import gracefulShutdown from "http-graceful-shutdown";
import exitOptions from "@config/exitOptions";
import Logger from "@config/logOptions";
import config from "@config";
import loaders from "@loaders";

const { env, port } = config;
const serverActiveMsg = `Server running in ${env} mode on port ${port}`;

const startServer = async () => {
  const app: express.Application = express();

  // Load Favicon
  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

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

  process.on("unhandledRejection", (reason, promise) => {
    // Application specific logging, throwing an error, or other logic here
    Logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  });

  gracefulShutdown(app, exitOptions);
};

startServer();
