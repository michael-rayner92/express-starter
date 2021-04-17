import express from "express";
import loadi18n from "@loaders/loadi18n";
import loadLogger from "@loaders/loadLogger";
import loadRoutes from "@loaders/loadRoutes";
import loadSecurity from "@loaders/loadSecurity";
import loadHealthChecks from "@loaders/loadHealthChecks";
import loadErrorHandlers from "@loaders/loadErrorHandlers";

const startServer = async (app: express.Application): Promise<void> => {
  // Load Health Checks
  loadHealthChecks(app);

  // Load Security
  // => Load Sentry
  // => Load Application Security
  loadSecurity(app);

  // Load Logging
  loadLogger(app);

  // Load Internationalise
  loadi18n(app);

  // Load Static Assets (If required)

  // Load Routes
  loadRoutes(app);

  // Load Sockets ?? Here

  // Load Error Handlers
  //  => Sentry Handlers
  //  => Application Handlers
  loadErrorHandlers(app);
};

export default startServer;
