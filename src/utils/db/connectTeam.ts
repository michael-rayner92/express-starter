import { createConnection, Connection } from "mongoose";
import Logger from "@utils/logger";
import TenantSchema from "@models/Tenant";
import ErrorResponse from "@helpers/errorResponse";
import { ITenantDoc, ITenantModel } from "@models/ITenant";
import { mongoURI, mongoOptions } from "./config";

const connectTeamDB = async (): Promise<Connection> => {
  try {
    const options = { ...mongoOptions, dbName: "team" };
    const db = createConnection(mongoURI, options);

    db.on("error", err => Logger.error(err));
    db.once("open", () => Logger.verbose("Team DB Connected"));

    // Connect Team Schemas
    db.model<ITenantDoc, ITenantModel>("Tenant", TenantSchema);

    return db;
  } catch (err) {
    throw new ErrorResponse(err, 500);
  }
};

export default connectTeamDB;
