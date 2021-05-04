import express from "express";
import loadi18n from "@loaders/loadi18n";
import loadLogger from "@loaders/loadLogger";
import loadRoutes from "@loaders/loadRoutes";
import loadSentry from "@loaders/loadSentry";
import loadSecurity from "@loaders/loadSecurity";
import loadScheduler from "@loaders/loadScheduler";
import loadHealthChecks from "@loaders/loadHealthChecks";
import loadErrorHandlers from "@loaders/loadErrorHandlers";

const startServer = (app: express.Application): void => {
  loadHealthChecks(app);
  loadLogger(app);
  loadi18n(app);

  loadSentry(app);
  loadSecurity(app);

  loadRoutes(app);
  loadScheduler();

  // Load Sockets ?? Here
  loadErrorHandlers(app);
};

export default startServer;
