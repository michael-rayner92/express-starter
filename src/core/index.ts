import express from "express";
import initi18n from "@core/initi18n";
import initRedis from "@core/initRedis";
import initLogger from "@core/initLogger";
import initRoutes from "@core/initRoutes";
import initSentry from "@core/initSentry";
import initHeaders from "@core/initHeaders";
import initScheduler from "@core/initScheduler";
import initHealthChecks from "@core/initHealthChecks";
import initErrorHandlers from "@core/initErrorHandlers";

const startServer = (app: express.Application): void => {
  initHealthChecks(app);
  initLogger(app);
  initi18n(app);

  initSentry(app);
  initHeaders(app);

  initRedis.getClient();

  initRoutes(app);
  initScheduler();

  // Load Sockets ?? Here
  initErrorHandlers(app);
};

export default startServer;
