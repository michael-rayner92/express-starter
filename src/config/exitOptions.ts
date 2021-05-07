import mongoose from "mongoose";
import GracefulShutdown from "http-graceful-shutdown";
import redisClient from "@utils/cache";
import Logger from "@utils/logger";
import config from "@config";

const TIMEOUT_VALUE = 1500;

let mongoClientExited = false;
let redisClientExited = false;
const expressServerExited = true;
// let sentryClientExited = false;

// @@todo Example Shutdown
// Partially implemented
// @@resource https://medium.com/swlh/graceful-mongoose-redis-express-in-node-js-eeee78398b17

// @@todo: Look further into handling shutdowns once error logging has been setup
// @@resource https://github.com/sebhildebrandt/http-graceful-shutdown
// @@resource https://blog.heroku.com/best-practices-nodejs-errors

const attemptToExitProcess = (): void => {
  if (mongoClientExited && expressServerExited && redisClientExited) {
    Logger.info("All connections have cleanly closed. Exiting process...");
    process.exit(0);
  }
};

const attemptToCloseMongo = (): void => {
  Logger.info("Attempting to close mongo client...");

  mongoose.connection.close(() => {
    Logger.info("Mongoose connection disconnected through app termination");
    mongoClientExited = true;
    attemptToExitProcess();
  });
};

const attemptToCloseRedis = async (): Promise<void> => {
  Logger.info("Attempting to close redis client...");

  redisClientExited = await redisClient.closeCache();
  attemptToExitProcess();
};

// @@Todo look at Sentry shutdown
// @@Link https://docs.sentry.io/platforms/node/guides/express/configuration/draining
// const attemptToCloseSentry = (): boolean => {
//   Logger.info("Attempting to close Sentry client...");

//   sentryClientExited = Sentry.close(() => {
//     Logger.info("Sentry connection disconnected through app termination");
//   });
//   attemptToExitProcess();
// };

const onShutdown = (signal: string): Promise<void> => {
  return new Promise(resolve => {
    Logger.error(`Server shutting down on ${signal} signal`);
    Logger.info("...🧹 in cleanup");

    // app.close(() => {
    // Logger.info("Express server closed");
    attemptToCloseMongo();
    attemptToCloseRedis();
    // attemptToCloseSentry();
    // });

    setTimeout(() => {
      if (!mongoClientExited) {
        Logger.error("Mongoose client did not close in time");
      }

      if (!redisClientExited) {
        Logger.error("Redis client did not close in time. Forcibly exiting");
        redisClient.forceExit();
      }

      // if (!sentryClientExited) {
      //   Logger.error("Sentry client did not close in time. Forcibly exiting");
      //   Sentry.close();  // Replace with a forceful shutdown method
      // }

      if (!expressServerExited) {
        Logger.error("Express server did not close in time");
      }

      Logger.info("...🗑 cleanup finished");
      resolve();
    }, TIMEOUT_VALUE);
  });
};

const onClose = (): void => {
  Logger.error("⚰ Server gracefully shut down...");
};

const exitOptions: GracefulShutdown.Options = {
  signals: "SIGINT SIGTERM",
  timeout: TIMEOUT_VALUE, // timeout: 15 secs
  development: config.isDev, // not in dev mode
  forceExit: true, // triggers process.exit() at the end of shutdown process
  onShutdown: onShutdown, // shutdown function (async) - e.g. for cleanup
  finally: onClose // finally function (sync) - e.g. for logging
};

export default exitOptions;
