import express from "express";
import config from "@config";

const healthCheckLoader = (app: express.Application): void => {
  app.get("/status", (req, res) => res.status(200).end());
  app.head("/status", (req, res) => res.status(200).end());

  app.get("/version", (req, res) => {
    res.status(200).json({ version: config.version }).end();
  });

  // @@Todos /metrics, /debug, /health
};

export default healthCheckLoader;
