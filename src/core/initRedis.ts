import Redis from "ioredis";
import config from "@config";
import Logger from "@utils/logger";

const ONE_MINUTE = 60 * 1000;
const INTERVAL_VALUE = 4 * ONE_MINUTE;

const redis = new Redis(config.redisUrl);
// const redis = new Redis(url, { tls: { rejectUnauthorized: false } });

redis.on("connect", () => Logger.info("🛢 Redis database is now available"));
redis.on("error", err => Logger.error(err));

setInterval(() => {
  Logger.debug("Keeping alive - Node.js Performance Test with Redis");
  redis.set("ping", "pong");
}, INTERVAL_VALUE);

export default { getClient: (): Redis.Redis => redis };
