import config from "@config";

export const colors = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  http: "magenta",
  verbose: "blue",
  debug: "white",
  silly: "green"
};

export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

export const level = config.isDev ? "silly" : "warn";
export const timeFormat = config.isDev ? "HH:mm:ss" : "YYYY-MM-DD HH:mm:ss:ms";

const { username, password, cluster, logs } = config.mongo;
const mongoUri = `mongodb+srv://${username}:${password}@${cluster}/${logs}`;

export const mongoConfig = {
  db: mongoUri,
  silent: config.isDev,
  level: "error",
  name: "MongoLogs",
  capped: true,
  decolorize: true,
  options: { poolSize: 2, useNewUrlParser: true, useUnifiedTopology: true }
};
