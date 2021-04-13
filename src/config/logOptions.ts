import "winston-mongodb";
import winston from "winston";
import config from "@config";

const { username, password, cluster } = config.mongo;
const mongoUri = `mongodb+srv://${username}:${password}@${cluster}/logs`;
const mongoOptions = {
  poolSize: 2,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  http: "magenta",
  verbose: "blue",
  debug: "white",
  silly: "green"
};

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const level = config.isDev ? "silly" : "warn";

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.json(),
  winston.format.metadata(),
  winston.format.timestamp(),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  // ? @@question Should local file logs be disabled in production?
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  new winston.transports.File({ filename: "logs/all.log" }),
  new winston.transports.MongoDB({
    db: mongoUri,
    level: "error",
    name: "MongoLogs",
    silent: config.isDev,
    options: mongoOptions,
    decolorize: true,
    capped: true
  })
];

const Logger = winston.createLogger({ level, levels, format, transports });

export default Logger;
