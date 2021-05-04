import fs from "fs";
import https from "https";
import express from "express";
import favicon from "serve-favicon";
import gracefulShutdown from "http-graceful-shutdown";
import config from "@config";
import loaders from "@loaders";
import Logger from "@services/logger";
import exitOptions from "@config/exitOptions";

const { isDev, env, port } = config;
const serverActiveMsg = `Server running in ${env} mode on port ${port}`;

const sslCredentials = {
  key: isDev ? fs.readFileSync("certs/key.pem") : "",
  cert: isDev ? fs.readFileSync("certs/cert.pem") : ""
};

const startServer = async () => {
  const app: express.Application = express();

  app.use(favicon("public/favicon.ico"));
  app.use(express.static("public"));

  loaders(app);

  const server = isDev ? https.createServer(sslCredentials, app) : app;

  server
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

  gracefulShutdown(server, exitOptions);
};

startServer();
