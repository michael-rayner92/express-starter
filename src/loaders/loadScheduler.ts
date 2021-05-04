import schedule from "node-schedule";
import Logger from "@services/logger";

const dailySnapshot = () => {
  Logger.verbose("Creating daily snapshot");
};

const loadSchedules = (): void => {
  // Run Hourly Tasks
  schedule.scheduleJob("0 * * * *", () => {
    Logger.info("Running Hourly Tasks");
  });

  // Run Daily Tasks
  schedule.scheduleJob("0 0 * * *", () => {
    Logger.info("Running Daily Tasks");
    dailySnapshot();
  });

  // Run Weekly Tasks
  schedule.scheduleJob("0 0 * * FRI", () => {
    Logger.info("Running Weekly Tasks");
  });
};

export default loadSchedules;

// @@Resource https://www.npmjs.com/package/node-schedule
