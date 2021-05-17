import express from "express";
import teamRoutes from "@routes/teamRoutes";
import testRoutes from "@routes/testRoutes";

const initRoutes = (app: express.Application): void => {
  teamRoutes(app);
  testRoutes(app);
};

export default initRoutes;
