import express from "express";
import config from "@config";
import Logger from "@config/logOptions";
import loaders from "@loaders";
import "colors";

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
};

startServer();
