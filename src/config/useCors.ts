import { CorsOptions } from "cors";
import config from "./index";

const { isProd, domains } = config;
const whitelist = Object.values(domains)
  .filter(domain => domain) // Remove empty values
  .map(domain => domain);

const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!isProd) return cb(null, true);

    const isWhitelisted = !origin || whitelist.indexOf(origin) !== -1;
    if (isWhitelisted) return cb(null, isWhitelisted);

    const errMsg = `Origin ${origin} not allowed by CORS`;
    return cb(new Error(errMsg));
  },
  optionsSuccessStatus: 200
};

export default corsOptions;
