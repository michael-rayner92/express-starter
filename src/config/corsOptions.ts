import config from "./index";
const whitelist = Object.keys(config.domains).map(domain => domain);

const corsOptions = {
  origin: (origin: string, callback): void => {
    if (whitelist.indexOf(origin) === -1) return callback(null, true);
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  optionsSuccessStatus: 200
};

export default corsOptions;
