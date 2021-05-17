import { createConnection, Connection } from "mongoose";
import Logger from "@utils/logger";
import { mongoURI, mongoOptions } from "./config";
import { UserSchema, IUser } from "@models/User";
import ErrorResponse from "@helpers/errorResponse";

const connectTenantDB = (dbName: string): Connection => {
  try {
    const options = { ...mongoOptions, poolSize: 1, dbName };
    const db = createConnection(mongoURI, options);

    db.on("error", err => Logger.error(err));
    db.once("open", () => Logger.verbose(`${dbName} DB Connected`));

    // Connect Tenant Schemas
    db.model<IUser>("User", UserSchema);

    return db;
  } catch (err) {
    Logger.error(err);
    throw new ErrorResponse(err, 500);
  }
};

export default connectTenantDB;
