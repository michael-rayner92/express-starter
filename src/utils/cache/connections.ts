import Logger from "@utils/logger";
import redisClient from "@core/initRedis";

const redis = redisClient.getClient();

export const closeCache = async (): Promise<boolean> => {
  try {
    await redis.quit();
    Logger.info("🛢 Redis connection disconnected through app termination");
    return true;
  } catch (err) {
    Logger.error(`Redis failed to gracefylly quit`, err);
    return false;
  }
  return false;
};

export const forceExit = (): void => {
  Logger.warn("Redis client did not close in time. Forcibly exiting");
  redis.disconnect();
};
