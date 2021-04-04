import express from "express";
import cors from "cors";
import config from "./config";
import corsOptions from "./config/useCors";
import "colors";

const { env, port } = config;
const serverActiveMsg = `Server running in ${env} mode on port ${port}`;

const startServer = async () => {
  const app: express.Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cors(corsOptions));

  app.get("/", (req, res) => {
    console.log("ROUTE WORKS!");
    res.status(200).send({ message: "Success" });
  });

  app
    .listen(port, () => console.log(`${serverActiveMsg}`.yellow.bold))
    .on("error", err => {
      console.log(`Server failed with ${err}`.red.bold);
      process.exit(1);
    });
};

startServer();
