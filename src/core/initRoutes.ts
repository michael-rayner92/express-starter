import express from "express";
import testRoutes from "@routes/testRoutes";

const initRoutes = (app: express.Application): void => {
  testRoutes(app);
};

export default initRoutes;
