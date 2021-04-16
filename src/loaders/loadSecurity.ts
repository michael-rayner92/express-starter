import express from "express";
// import cspOptions from "@config/cspOptions";

const securityLoader = (app: express.Application): void => {
  app.disable("x-powered-by");
  // ? @@question More Info: Caching on GET requests but should it be disabled?
  // app.disable("etag");
};

export default securityLoader;
