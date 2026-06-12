import express from "express";
import env from "./config/env.js"
import morgan from "morgan";
import googleOAuthMiddleware from "./middlewares/googleOAuth.middleware.js";
import authRouter from './modules/auth/auth.router.js'

export default function createApp() {
  const app = express();

  // Parse JSON requests
  app.use(express.json());

  // Parse form data requests
  app.use(express.urlencoded({ extended: true }));
  googleOAuthMiddleware(app)

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use('/api/auth',authRouter)

  return app;
}
