import schedule from "node-schedule";
import Logger from "@utils/logger";
import { dbSnapshot } from "@utils/jobs";

const initScheduler = (): void => {
  // Run Hourly Tasks
  schedule.scheduleJob("0 * * * *", () => {
    Logger.info("Running Hourly Tasks");
  });

  schedule.scheduleJob("0 * * * *", () => {
    Logger.info("Running Hourly Tasks");
  });

  // Run Daily Tasks
  schedule.scheduleJob("0 0 * * *", () => {
    Logger.info("Running Daily Tasks");
    dbSnapshot();
  });

  // Run Weekly Tasks
  schedule.scheduleJob("0 0 * * FRI", () => {
    Logger.info("Running Weekly Tasks");
  });
};

export default initScheduler;

// @@Resource https://www.npmjs.com/package/node-schedule
