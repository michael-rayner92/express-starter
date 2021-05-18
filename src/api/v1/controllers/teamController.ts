import { RequestHandler } from "express";
// import Logger from "@utils/logger";
import { getTeamModel, updateConnectionMap } from "@utils/db";
import asyncHandler from "@middleware/asyncHandler";
import ErrorResponse from "@helpers/errorResponse";

export const getAllTenants: RequestHandler = asyncHandler(async (req, res) => {
  const Tenant = getTeamModel("Tenant");

  const tenants = await Tenant.find();

  const data = {
    count: tenants.length,
    tenants: tenants.map(tenant => tenant.dbName)
  };

  return res.json({ success: true, data, message: "Team DB Fetched" });
});

/**
 * @async
 * @route POST /api/v1/team
 * @access Private
 * @category Team Routes
 * @description Create a new tenant
 */
export const createTenant: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const Tenant = getTeamModel("Tenant");

    // @@TODO Validate Input
    const { name, dbName } = req.body;

    const isTenant = await Tenant.findOne({ dbName });

    if (isTenant) {
      const errMsg = `${name} Tenant already exists`;
      return next(new ErrorResponse(errMsg, 400));
    }

    const newTenant = { name, dbName };
    const savedTenant = await Tenant.create(newTenant);

    updateConnectionMap(savedTenant.dbName);

    return res.status(201).json({
      success: true,
      data: savedTenant,
      message: "New Tenant Created"
    });
  }
);

// @@TODO replace dbName with _id/id
/**
 * @async
 * @route DELETE /api/v1/team/:id
 * @access Private
 * @category Team Routes
 * @description Delete a tenant by id
 */
export const deleteTenant: RequestHandler = asyncHandler(
  async (req, res, next) => {
    // Check ID is of the correct type
    const { id } = req.params;

    const Tenant = getTeamModel("Tenant");

    const tenant = await Tenant.findOneAndDelete({ dbName: id });

    if (!tenant) {
      const errMsg = `No db with id ${id} found`;
      return next(new ErrorResponse(errMsg, 400));
    }

    const successMsg = `${tenant.name} was deleted`;
    res.status(200).json({ success: true, message: successMsg });

    updateConnectionMap(tenant.dbName, true);
  }
);
