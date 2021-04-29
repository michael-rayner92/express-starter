import express from "express";
import testRoutes from "@routes/testRoutes";

const routesLoader = (app: express.Application): void => {
  testRoutes(app);
};

export default routesLoader;
