import express from "express";
// import cspOptions from "@config/cspOptions";

const securityLoader = (app: express.Application): void => {
  app.disable("x-powered-by");
};

export default securityLoader;
