import cors from "cors";
import express from "express";
import methodOverride from "method-override";
import corsOptions from "@config/corsOptions";
// import cspOptions from "@config/cspOptions";

const securityLoader = (app: express.Application): void => {
  app.enable("trust proxy");
  app.use(cors(corsOptions));

  app.use(methodOverride("X-HTTP-Method-Override"));
  app.disable("x-powered-by");
  // app.disable("etag");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default securityLoader;
