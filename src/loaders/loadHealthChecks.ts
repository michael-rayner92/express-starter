import express from "express";

const healthCheckLoader = (app: express.Application): void => {
  app.get("/status", (req, res) => res.status(200).end());
  app.head("/status", (req, res) => res.status(200).end());
};

export default healthCheckLoader;
