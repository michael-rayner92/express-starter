import Logger from "@utils/logger";
import redisClient from "@core/initRedis";
import { closeCache, forceExit } from "./connections";

const redis = redisClient.getClient();

const checkCache = async (key: string): Promise<boolean> => {
  Logger.info(`Checking Cache for key: ${key}`);

  try {
    const result = await redis.get(key);
    Logger.info("Cached Value: ", result);
    return true;
  } catch (err) {
    Logger.warn("No cached value stored: ");
    return false;
  }

  return false;
};

const useCache = async (key: string): Promise<string | null> => {
  const cacheValue = await redis.get(key);

  if (cacheValue) {
    Logger.silly("Value found in cache");
    Logger.verbose(cacheValue);
    return cacheValue;
  }

  redis.setex(key, 15, "Setting new value");
  return null;
};

const updateCache = (): void => {
  Logger.info("Updating Cache");
};

const flushCache = (): void => {
  Logger.warn("Cache Flushed");
  redis.flushall();
};

export default {
  closeCache,
  forceExit,
  checkCache,
  updateCache,
  flushCache,
  useCache
};
