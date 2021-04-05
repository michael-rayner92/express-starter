import dotenv from "dotenv";
import "colors";

process.env.NODE_ENV = process.env.NODE_ENV ?? "development";
const envVars = dotenv.config();

if (envVars.error) throw new Error("⚠ No .env file found");

export default {
  port: parseInt(process.env.PORT ?? "5000", 10),
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  mongo: {
    uri: process.env.MONGO_URI,
    username: process.env.MONGO_USER,
    cluster: process.env.MONGO_CLUSTER,
    options: process.env.MONGO_OPTIONS,
    password: process.env.MONGO_PASSWORD
  },
  domains: {
    api: process.env.API_URL,
    public: process.env.PUBLIC_URL
  },
  jwt: {
    expire: process.env.JWT_EXPIRE,
    secret: process.env.JWT_SECRET
  },
  sendgrid: {
    key: process.env.SENDGRID_KEY,
    user: process.env.SENDGRID_USER,
    email: process.env.SENDGRID_EMAIL
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    org: process.env.SENTRY_ORG,
    key: process.env.SENTRY_AUTH_TOKEN,
    project: process.env.SENTRY_PROJECT,
    release: process.env.SENTRY_RELEASE
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
