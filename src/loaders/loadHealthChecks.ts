import express from "express";

const healthCheckLoader = (app: express.Application): void => {
  app.get("/status", (req, res) => res.status(200).end());
  app.head("/status", (req, res) => res.status(200).end());

  app.get("/version", (req, res) =>
    res.status(200).json({ v: "v0.0.1" }).end()
  );
  // @@Todos /metrics, /debug, /health
};

export default healthCheckLoader;
