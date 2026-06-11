import createApp from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import connectDB from "./database/mongodb.js";

const app = createApp();

function startServer() {
  connectDB()
    .then(() => {
      app.listen(env.PORT, () => {
        logger.info({ port: env.PORT }, "server running ");
      });
    })
    .catch((err) => {
      logger.error({ error: err }, "error while running server");
    });
}

startServer();
