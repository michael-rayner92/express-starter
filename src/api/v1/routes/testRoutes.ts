import { Router } from "express";
import {
  testRoute,
  testSendEmail,
  testAsyncRoute,
  testErrorRoute,
  testThrowRoute
} from "@controllers/testController";

const router: Router = Router();

const testRoutes = (app: Router): void => {
  app.use("/", router);

  router.get("/", testRoute);
  router.get("/async", testAsyncRoute);
  router.get("/error", testErrorRoute);
  router.get("/throw", testThrowRoute);
  router.get("/send-email", testSendEmail);
};

export default testRoutes;
