import { Connection, Model } from "mongoose";
import Logger from "@utils/logger";
import connectTeamDB from "./connectTeam";
import connectTenantDB from "./connectTenant";
import { getAllTenants } from "./tenantHelpers";
import { ITenantDoc } from "@models/ITenant";
import ErrorResponse from "@helpers/errorResponse";

type ConnectionMapItem = { [x: string]: Connection };

let teamDB: Connection | undefined;
let connectionMap: ConnectionMapItem | undefined;

export const connectDBs = async (): Promise<void> => {
  let tenants: ITenantDoc[] | undefined;

  try {
    teamDB = await connectTeamDB();
    tenants = await getAllTenants(teamDB);
  } catch (err) {
    throw new ErrorResponse(err, 500);
  }

  if (!tenants.length) {
    Logger.warn("No Tenants Found");
    return;
  }

  connectionMap = tenants
    .map(({ dbName }) => ({ [dbName]: connectTenantDB(dbName) }))
    .reduce((prev, next) => Object.assign({}, prev, next), {});
};

export const getTenantDB = (tenantId: string): Connection => {
  if (!connectionMap) throw new ErrorResponse("No tenants connected", 500);
  const tenantDB = connectionMap[tenantId];

  if (!tenantDB) throw new ErrorResponse(`${tenantId} DB not found`, 500);
  return tenantDB;
};

export const getTeamDB = (): Connection => {
  if (!teamDB) throw new ErrorResponse("Team DB not connected", 500);
  return teamDB;
};

export const getTeamModel = (model: string): Model<any> => {
  if (!teamDB) throw new ErrorResponse("Team DB not connected", 500);
  const dbModel = teamDB.model(model);

  if (!dbModel) throw new ErrorResponse(`${model} model not found`, 500);
  return dbModel;
};

export const getModel = (model: string, db: Connection): Model<any> => {
  if (!db) throw new ErrorResponse("Could not connect to db", 500);
  const dbModel = db.model(model);

  if (!dbModel) throw new ErrorResponse(`${model} model not found`, 500);
  return dbModel;
};

export const updateConnectionMap = (dbName: string, remove = false): void => {
  if (!dbName) throw new ErrorResponse("No DB name supplied", 400);
  if (!connectionMap) throw new ErrorResponse("No tenants connected", 500);

  // @@TODO Update Redis Cache && Look at proper disconnection
  if (remove) {
    Object.keys(connectionMap).filter(conn => conn !== dbName);
    Logger.warn(`${dbName} was disconnected`);
    return;
  }

  connectionMap[dbName] = connectTenantDB(dbName);
};
