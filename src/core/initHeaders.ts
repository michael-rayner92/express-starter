import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import responseTime from "response-time";
import rateLimiter from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import methodOverride from "method-override";
import corsOptions from "@config/corsOptions";
import limitOptions from "@config/limitOptions";
// import cspOptions from "@config/cspOptions";
import config from "@config";

const { isDev } = config;

const initHeaders = (app: express.Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.enable("trust proxy");
  app.use(methodOverride("X-HTTP-Method-Override"));
  // @@Todos Finish CSP and add to header via helmet
  app.use(helmet({ contentSecurityPolicy: false }));
  app.disable("x-powered-by");
  app.disable("etag");
  app.use(responseTime());

  if (!isDev) {
    app.use(compression());
    app.use(rateLimiter(limitOptions));
  }

  app.use(mongoSanitize());
  app.use(hpp());
  // @@todo Look into xss prevention strategies and package options
  app.use(cors(corsOptions));
};

export default initHeaders;
