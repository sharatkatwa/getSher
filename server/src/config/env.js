import dotenv from 'dotenv'
dotenv.config()
import z from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number(),
    MONGO_URL: z.string(),
    NODE_ENV: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    JWT_SECRET: z.string(),
    REDIRCT_URL: z.string(),
    REFRESH_TOKEN_SERCRET:z.string(),
    ACCESS_TOKEN_SERCRET:z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.log("Check your env's");
}
export default parsed.data;