import express from "express";
import env from "./config/env.js"
import morgan from "morgan";
import ErrorHandler from "./middlewares/errorHandler.middleware.js";
import securityMiddleware from "./middlewares/security.middleware.js";
import googleOAuthMiddleware from "./middlewares/googleOAuth.middleware.js";
import authRouter from './modules/public/auth/auth.router.js'
import publicPlayerRouter from "./modules/public/player/player.router.js";
import privatePlayerRouter from "./modules/private/player/player.router.js";

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
  // all middlewares related to security found here
  securityMiddleware(app)

  app.get("/health", (req, res) => {
    res.json({
      message: "api is healthy",
    });
  });

  app.use('/api/auth',authRouter)

  app.use("/api/player", publicPlayerRouter);
app.use("/api/private/player", privatePlayerRouter);

  app.use(ErrorHandler)

  return app;
}
