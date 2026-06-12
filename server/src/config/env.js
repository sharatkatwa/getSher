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
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.log("Check your env's");
}

export default parsed.data;
