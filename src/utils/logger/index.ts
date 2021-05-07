import "winston-mongodb";
import winston from "winston";
import config from "@config";
import { colors, timeFormat, level, levels, mongoConfig } from "./config";

const { isDev } = config;

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: timeFormat }),
  winston.format.colorize({ all: true }),
  winston.format.json(),
  winston.format.metadata(),
  winston.format.timestamp(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.MongoDB(mongoConfig),
  new winston.transports.Console({ silent: !isDev }),
  new winston.transports.File({ silent: !isDev, filename: "logs/all.log" }),
  new winston.transports.File({
    level: "error",
    silent: !isDev,
    filename: "logs/error.log"
  })
];

const Logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
  handleExceptions: true
});

export default Logger;
