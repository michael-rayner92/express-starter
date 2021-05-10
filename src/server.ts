import fs from "fs";
import https from "https";
import throng from "throng";
import express from "express";
import favicon from "serve-favicon";
import gracefulShutdown from "http-graceful-shutdown";
import exitOptions from "@config/exitOptions";
import initMiddleware from "@core";
import Logger from "@utils/logger";
import config from "@config";

const { isDev, env, port, webConcurrency } = config;
const serverActiveMsg = `Server running in ${env} mode on port ${port}`;
const workerActiveMsg = `Worker ${process.pid} is now up`;

const sslCredentials = {
  key: isDev ? fs.readFileSync("certs/key.pem") : "",
  cert: isDev ? fs.readFileSync("certs/cert.pem") : ""
};

const startServer = async (): Promise<void> => {
  const app: express.Express = express();

  app.use(favicon("public/favicon.ico"));
  app.use(express.static("public"));

  const server = isDev ? https.createServer(sslCredentials, app) : app;
  initMiddleware(app);

  server.listen(port, () => {
    Logger.info(serverActiveMsg);
    Logger.info(workerActiveMsg);
  });

  server.on("error", err => {
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

throng({ worker: startServer, count: webConcurrency, lifetime: Infinity });
