import express from "express";
import config from "./config";
import "colors";

const { env, port } = config;
const serverActiveMsg = `Server running in ${env} mode on port ${port}`;

const startServer = async () => {
  const app: express.Application = express();

  app
    .listen(port, () => console.log(`${serverActiveMsg}`.yellow.bold))
    .on("error", err => {
      console.log(`Server failed with ${err}`.red.bold);
      process.exit(1);
    });
};

startServer();