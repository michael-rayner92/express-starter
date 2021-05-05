import { promisify } from "util";
import express from "express";
import redis from "redis";
import Logger from "@utils/logger";

const redisUrl = "redis://127.0.0.1:6379";

const clearCache = (client: redis.RedisClient) => {
  client.flushall();
  Logger.info("Redis Cache Flushed");
};

const initRedis = (app: express.Application): void => {
  const client = redis.createClient(redisUrl);

  client.on("error", err => Logger.error(err));

  const GET_ASYNC = promisify(client.get).bind(client);
  const SET_ASYNC = promisify(client.set).bind(client);

  // Clear entire cache
  // clearCache(client);
};

export default initRedis;

/**
 * Example use
  app.get("/rockets", async (req, res, next) => {
    const reply = await GET_ASYNC("rockets");
    if (reply) {
      console.log("Using cached data");
      res.send(JSON.parse(reply));
      return;
    }

    const response = await axios.get("https://api.spacexdata.com/v3/rockets");

    const saveResult = await SET_ASYNC("rockets", JSON.stringify(response.data), "EX", 5);

    console.log("New data cached", saveResult);
  });
 */
