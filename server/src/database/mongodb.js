import mongoose from "mongoose";
import env from "../config/env.js";
import logger from "../config/logger.js";

async function connectDB() {
  await mongoose.connect(env.MONGO_URI);
  logger.info("mongodb conected");
}

export default connectDB;
