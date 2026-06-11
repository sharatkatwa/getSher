import dotenv from 'dotenv'
dotenv.config()
import z from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number(),
    MONGO_URL: z.string(),
    NODE_ENV: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.log("Check your env's");
}
export default parsed.data;