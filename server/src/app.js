import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import ErrorHandler from "./middleware/errorHandler.middleware.js";

export default function createApp() {
  const app = express();

  // Parse JSON requests
  app.use(express.json());

  // Parse form data requests
  app.use(express.urlencoded({ extended: true }));

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use(ErrorHandler)

  return app;
}
