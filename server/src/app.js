import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import securityMiddleware from "./middlewares/security.middleware.js";

export default function createApp() {
  const app = express(); 

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  // all middlewares related to security found here
  securityMiddleware(app)
  console.log('HHHHHHHHHHHHHHHHHH');

  app.get("/health", (req, res) => {
    res.json({
      message: "api is healthy",
    });
  });

  return app;
}
