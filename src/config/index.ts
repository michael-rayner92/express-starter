import dotenv from "dotenv";
// import { name, version } from "../../package.json";
// console.log("PACKAGE NAME", process.env.npm_package_name);

const name = "express-starter";
const version = "v1.0.0";

const env = process.env.NODE_ENV ?? "development";
process.env.NODE_ENV = env;

const envVars = dotenv.config();

if (env === "development" && envVars.error) {
  throw new Error("⚠ No .env file found");
}

export default {
  env,
  name,
  version,
  port: parseInt(process.env.PORT ?? "5000", 10),
  webConcurrency: parseInt(process.env.WEB_CONCURRENCY ?? "1", 10),
  redisUrl: process.env.REDIS_URL ?? "rediss://127.0.0.1:6379",
  isDev: env === "development",
  isProd: env === "production",
  isTest: env === "test",
  mongo: {
    uri: process.env.MONGO_URI ?? "",
    logs: process.env.MONGO_LOGS ?? "devLogs",
    username: process.env.MONGO_USER ?? "",
    cluster: process.env.MONGO_CLUSTER ?? "",
    options: process.env.MONGO_OPTIONS ?? "",
    password: process.env.MONGO_PASSWORD ?? ""
  },
  domains: {
    api: process.env.API_URL,
    public: process.env.PUBLIC_URL
  },
  jwt: {
    expire: process.env.JWT_EXPIRE ?? "30d",
    secret: process.env.JWT_SECRET
  },
  sendgrid: {
    key: process.env.SENDGRID_KEY ?? "",
    user: process.env.SENDGRID_USER ?? "",
    email: process.env.SENDGRID_EMAIL ?? ""
  },
  sentry: {
    dsn: process.env.SENTRY_DSN ?? "",
    org: process.env.SENTRY_ORG ?? "",
    key: process.env.SENTRY_AUTH_TOKEN ?? "",
    project: process.env.SENTRY_PROJECT ?? "",
    environment: process.env.SENTRY_ENVIRONMENT ?? env,
    release: `${name}@${version}`
  },
  webPush: {
    contact: process.env.WEB_PUSH_CONTACT,
    publicKey: process.env.PUBLIC_VAPID_KEY,
    privateKey: process.env.PRIVATE_VAPID_KEY
  },
  crypto: {
    key: process.env.CRYPTO_KEY,
    algorithm: process.env.CRYPTO_ALGORITHM
  },
  aws: {
    s3: process.env.AWS_S3,
    region: process.env.AWS_REGION,
    iamId: process.env.AWS_IAM_ACCESS_ID,
    iamSecret: process.env.AWS_IAM_SECRET,
    bucketName: process.env.AWS_BUCKET_NAME
  }
};
