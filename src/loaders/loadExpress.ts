import cors from "cors";
import express from "express";
import methodOverride from "method-override";
import corsOptions from "@config/corsOptions";

const expressLoader = async (app: express.Application): Promise<void> => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");
  app.use(cors(corsOptions));

  app.use(methodOverride("X-HTTP-Method-Override"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

export default expressLoader;
