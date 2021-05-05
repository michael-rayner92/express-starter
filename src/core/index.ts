import express from "express";
import initi18n from "@core/initi18n";
import initLogger from "@core/initLogger";
import initRoutes from "@core/initRoutes";
import initSentry from "@core/initSentry";
import initSecurity from "@core/initSecurity";
import initScheduler from "@core/initScheduler";
import initHealthChecks from "@core/initHealthChecks";
import initErrorHandlers from "@core/initErrorHandlers";

const startServer = (app: express.Application): void => {
  initHealthChecks(app);
  initLogger(app);
  initi18n(app);

  initSentry(app);
  initSecurity(app);

  initRoutes(app);
  initScheduler();

  // Load Sockets ?? Here
  initErrorHandlers(app);
};

export default startServer;
