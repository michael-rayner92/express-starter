import cors from "cors";
import config from "./index";

const { isProd, domains } = config;
const whitelist = Object.keys(domains).map(domain => domain);

const corsOptionsDelegate = (req, cb) => {
  const isWhitelisted = whitelist.indexOf(req.header("Origin")) !== -1;
  const isAllowedExt = req.path.endsWith(".jpg");
  const isAllowed = isWhitelisted && isAllowedExt;

  const corsOptions = { origin: isAllowed };
  cb(null, corsOptions);
};

const loadCors = () => {
  if (isProd) return cors(corsOptionsDelegate());
  return cors();
};

const corsOptions = {
  origin: (origin: string, callback): void => {
    try {
      if (origin == null) return;
      if (whitelist.indexOf(origin) !== -1) return callback(null, true);
    } catch (err) {
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  optionsSuccessStatus: 200
};

export default corsOptions;
