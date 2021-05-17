import mongoose from "mongoose";
import config from "@config";

const { cluster, password, username, options } = config.mongo;

export const mongoURI = `mongodb+srv://${username}:${password}@${cluster}/${options}`;

export const mongoOptions: mongoose.ConnectionOptions = {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  keepAlive: true,
  poolSize: 10,
  // bufferMaxEntries: 0,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 10000,
  keepAliveInitialDelay: 300000
};
