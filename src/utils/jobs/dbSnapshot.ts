import Logger from "@utils/logger";

const dbSnapshot = (): void => {
  Logger.verbose("Creating daily snapshot");

  // Loop through all DBs
  // Take snapshot of targeted collections
  // Save results to DB
  // Update each tenant with summarised statistics
};

export default dbSnapshot;
