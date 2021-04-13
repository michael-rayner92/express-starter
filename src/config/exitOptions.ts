import config from "@config";
import Logger from "@config/logOptions";
import GracefulShutdown from "http-graceful-shutdown";

// @@todo: Look further into handling shutdowns once error logging has been setup
// @@resource https://github.com/sebhildebrandt/http-graceful-shutdown
// @@resource https://blog.heroku.com/best-practices-nodejs-errors

// your personal cleanup function
// - must return a promise
// - the input parameter is optional (only needed if you want to
//   access the signal type inside this function)
// - this function here in this example takes one second to complete
const onCleanUp = (signal: string): Promise<void> => {
  return new Promise(resolve => {
    Logger.info("... called signal: " + signal);
    Logger.info("... in cleanup");
    setTimeout(() => {
      Logger.info("... cleanup finished");
      resolve();
    }, 1000);
  });
};

// finally function
// -- sync function
// -- should be very short (not time consuming)
const onClose = (): void => {
  Logger.info("Server gracefully shut down.....");
};

const exitOptions: GracefulShutdown.Options = {
  signals: "SIGINT SIGTERM",
  timeout: 500, // timeout: 0.5 secs
  development: config.isDev, // not in dev mode
  forceExit: true, // triggers process.exit() at the end of shutdown process
  onShutdown: onCleanUp, // shutdown function (async) - e.g. for cleanup DB
  finally: onClose // finally function (sync) - e.g. for logging
};

export default exitOptions;
