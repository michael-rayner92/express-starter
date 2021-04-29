import { Options } from "express-rate-limit";
import ErrorResponse from "@utils/errorResponse";

const limitReached = (): void => {
  throw new ErrorResponse("Too many requests, please try again later.", 429);
};

const limitOptions: Options = {
  max: 100,
  windowMs: 15 * 60 * 1000,
  handler: limitReached,
  onLimitReached: limitReached
};

export default limitOptions;

/** NOTES:
 * NPM package used: express-rate-limiter
 * @@Enhancement Add redis caching to use across load balancer setup
 * @@Resource https://www.npmjs.com/package/express-rate-limit
 * @@Enhancement Adding express-slow-down for specific routes
 * @@Resource https://www.npmjs.com/package/express-slow-down
 */
