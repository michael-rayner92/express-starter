import { Router } from "express";
import {
  testRoute,
  testSendEmail,
  testAsyncRoute,
  testErrorRoute,
  testThrowRoute,
  testRedisRoute
} from "@controllers/testController";

const router: Router = Router();

const testRoutes = (app: Router): void => {
  app.use("/", router);

  router.get("/", testRoute);
  router.get("/async", testAsyncRoute);
  router.get("/error", testErrorRoute);
  router.get("/throw", testThrowRoute);
  router.get("/send-email", testSendEmail);
  router.get("/redis/:key", testRedisRoute);
};

export default testRoutes;
