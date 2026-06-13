import express from "express";
import env from "./config/env.js"
import morgan from "morgan";

// middleware import statements
import ErrorHandler from "./middlewares/errorHandler.middleware.js";
import securityMiddleware from "./middlewares/security.middleware.js";
import googleOAuthMiddleware from "./middlewares/googleOAuth.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

// routes import statements
import authRouter from './modules/public/auth/auth.router.js'



export default function createApp() {
  const app = express(); 

  googleOAuthMiddleware(app)

  if (env.NODE_ENV === "development") {
  
    app.use(morgan("dev"));
  }
  
  // all middlewares related to security can found here
  securityMiddleware(app)

  app.get("/health", (req, res) => {
    res.json({
      message: "api is healthy",
    });
  });  

  app.use('/api/auth',authRouter)

  app.use(notFound)
  app.use(ErrorHandler)

  return app;
}
