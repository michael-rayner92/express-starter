import mongoose from "mongoose";
import config from "@config";

const { mongo } = config;
const { password, options, username, cluster } = mongo;

const initDB = async (): Promise<void> => {
  // Init MongoDB
};

export default initDB;
