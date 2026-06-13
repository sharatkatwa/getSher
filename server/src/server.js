import mongoose from "mongoose";
import createApp from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import connectDB from "./database/mongodb.js";

const app = createApp();

// function for graceful shutdown of server
const gracefulShutdown = (signal, server) => {
  console.log(`${signal} Shutting down the server...`);
  console.log(server);
  server.close(async () => {
    console.log("server closed");
    await mongoose.connection.close();
    console.log("mongodb connection closed");
    process.exit(0);
  });
  setTimeout(() => {
    console.log("forcefully shuttting down");
    process.exit(0);
  }, 10000);
};

function startServer() {
  let server;
  
  connectDB()
    .then(() => {
      server = app.listen(env.PORT, () => {
        logger.info({ port: env.PORT }, "server running ");
      });

      process.on("SIGTERM", () => gracefulShutdown("SIGTERM", server));
      process.on("SIGINT", () => gracefulShutdown("SIGINT", server));
    })
    .catch((err) => {
      logger.error({ error: err }, "error while running server");
    });
}

startServer();
