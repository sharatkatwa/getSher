import mongoose from "mongoose";
import env from "../config/env.js";
import logger from "../config/logger.js";
import dns from 'dns'

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

async function connectDB() {
  await mongoose.connect(env.MONGO_URI);
  logger.info("mongodb connected");
}

export default connectDB;
