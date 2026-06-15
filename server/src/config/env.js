import dotenv from "dotenv";
dotenv.config();
import z from "zod";
import appConstant from "../constants/app.constant.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URI: z.string().default(appConstant.MONGO_URI),
  NODE_ENV: z.string().default(appConstant.NODE_ENV),
  LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
  CORS_ORIGIN: z.string(),
  RATELIMIT_WINDOWMS: z.coerce.number().default(appConstant.RATELIMIT_WINDOWMS),
  RATELIMIT: z.coerce.number().default(appConstant.RATELIMIT),
  GOOGLE_CALLBACK_URL:z.string().default(appConstant.GOOGLE_CALLBACK_URL),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  REDIRCT_URL: z.string(),
  REFRESH_TOKEN_SECRET:z.string(),
  ACCESS_TOKEN_SECRET:z.string(),
  GOOGLE_CALLBACK_URL : z.string().default(appConstant.GOOGLE_CALLBACK_URL)
});

const parsed = envSchema.safeParse(process.env);
// console.log(parsed, '___________');

if (!parsed.success) {
console.log(process.env.NODE_ENV);
  console.error(parsed.error.format());
  process.exit(1);
}

export default parsed.data;
