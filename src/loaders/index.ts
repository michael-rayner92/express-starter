import express from "express";
import loadi18n from "@loaders/loadi18n";
import loadLogger from "@loaders/loadLogger";
import loadExpress from "@loaders/loadExpress";
import loadSecurity from "@loaders/loadSecurity";
import testRoutes from "@routes/testRoutes";
import "colors";

const startServer = async (app: express.Application): Promise<void> => {
  await loadExpress(app);

  loadSecurity(app);
  loadLogger(app);
  loadi18n(app);

  // Routes
  testRoutes(app);
};

export default startServer;
