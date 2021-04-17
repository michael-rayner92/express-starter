import express from "express";
import gracefulShutdown from "http-graceful-shutdown";
import exitOptions from "@config/exitOptions";
import Logger from "@config/logOptions";
import config from "@config";
import loaders from "@loaders";

const { env, port } = config;
const serverActiveMsg = `Server running in ${env} mode on port ${port}`;

const startServer = async () => {
  const app: express.Application = express();

  await loaders(app);

  app
    .listen(port, () => Logger.info(serverActiveMsg))
    .on("error", err => {
      Logger.error(`Server failed with ${err}`);
      process.exit(1);
    });

  // @@todo Work back from current state to get the exitOptions working
  // @@link https://github.com/sebhildebrandt/http-graceful-shutdown/blob/master/examples/express-advanced-server.js

  // this enables the graceful shutdown with advanced options
  gracefulShutdown(app, {
    signals: "SIGINT SIGTERM",
    timeout: 0,
    development: false,
    onShutdown: function cleanup(signal) {
      return new Promise(resolve => {
        console.log();
        console.log('"onShutdown" function');
        console.log("... called signal: " + signal);
        console.log("... in cleanup");
        console.log("... for 5 seconds");
        console.log("...");
        setTimeout(function () {
          console.log("... cleanup finished");
          resolve();
        }, 5000);
      });
    },
    forceExit: true,
    finally: function () {
      console.log();
      console.log('In "finally" function');
      console.log("... Server gracefully shutted down.....");
    }
  });

  // gracefulShutdown(app, exitOptions);
};

startServer();
