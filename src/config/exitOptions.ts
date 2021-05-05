import GracefulShutdown from "http-graceful-shutdown";
import Logger from "@utils/logger";
import config from "@config";

// @@todo: Look further into handling shutdowns once error logging has been setup
// @@resource https://github.com/sebhildebrandt/http-graceful-shutdown
// @@resource https://blog.heroku.com/best-practices-nodejs-errors

const onShutdown = (signal: string): Promise<void> => {
  return new Promise(resolve => {
    Logger.error(`Server shutting down on ${signal} signal`);
    Logger.info("...🧹 in cleanup");

    // @@todo close any server connections
    // db.close(err => {
    //   if (err) Logger.error("Failed to closed Mongo connection");
    //   else Logger.info("Mongo connection closed successfully");
    // });

    // @@Todo look at Sentry shutdown
    // @@Link https://docs.sentry.io/platforms/node/guides/express/configuration/draining
    // Sentry.close(2000).then(() => process.exit());

    setTimeout(() => {
      Logger.info("...🗑 cleanup finished");
      resolve();
    }, 1000);
  });
};

const onClose = (): void => {
  Logger.error("⚰ Server gracefully shut down...");
};

const exitOptions: GracefulShutdown.Options = {
  signals: "SIGINT SIGTERM",
  timeout: 0, // timeout: 0 secs
  development: config.isDev, // not in dev mode
  forceExit: true, // triggers process.exit() at the end of shutdown process
  onShutdown: onShutdown, // shutdown function (async) - e.g. for cleanup DB
  finally: onClose // finally function (sync) - e.g. for logging
};

export default exitOptions;
