import { Connection } from "mongoose";
import Logger from "@utils/logger";
import ErrorResponse from "@helpers/errorResponse";
import { ITenant, ITenantDoc, ITenantModel } from "@models/ITenant";

export const getAllTenants = async (
  teamDB: Connection
): Promise<ITenantDoc[]> => {
  try {
    const Tenant = teamDB.model<ITenantDoc, ITenantModel>("Tenant");
    const tenants = await Tenant.find({});
    // Add to Redis Cache @@TODO
    return tenants;
  } catch (err) {
    Logger.error(err);
    throw new ErrorResponse("Failed to get tenants", 500);
  }
};

export const createTenant = async (
  teamDB: Connection,
  newTenant: ITenant
): Promise<ITenantDoc> => {
  try {
    const Tenant = teamDB.model<ITenantDoc, ITenantModel>("Tenant");

    // Check if already in DB [Check Redis Cache First @@TODO]
    const { dbName } = newTenant;
    const isTenant = await Tenant.findOne({ dbName });
    if (isTenant) throw new ErrorResponse(`${dbName} already exists`, 400);

    // Create New Tenant
    const savedTenant = await Tenant.create(newTenant);

    // Update Redis Cache @@TODO

    return savedTenant;
  } catch (err) {
    throw new ErrorResponse("Failed to create new tenant", 400);
  }
};
