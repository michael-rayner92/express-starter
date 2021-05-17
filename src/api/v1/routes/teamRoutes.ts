import { Application, Router } from "express";
import {
  createTenant,
  deleteTenant,
  getAllTenants
} from "@controllers/teamController";

const router = Router();

const teamRoutes = (app: Application): void => {
  app.use("/team", router);

  router.get("/tenants", getAllTenants);
  router.post("/tenants", createTenant);
  router.delete("/tenants/:id", deleteTenant);
};

export default teamRoutes;
