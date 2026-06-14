import express from "express";
import env from "./config/env.js";
import morgan from "morgan";

// middleware import statements
import ErrorHandler from "./middlewares/errorHandler.middleware.js";
import securityMiddleware from "./middlewares/security.middleware.js";
import googleOAuthMiddleware from "./middlewares/googleOAuth.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

// routes import statements
import authRoutes from './modules/public/auth/auth.router.js'
import privateTeamRoutes from './modules/private/team/team.route.js'
import publicTeamRoutes from './modules/public/team/team.route.js'

// routes import statements for private and public series statement
import privateSeriesRouter from "./modules/private/series/series.router.js";
import publicSeriesRouter from "./modules/public/series/series.router.js";

export default function createApp() {
  const app = express();

  googleOAuthMiddleware(app);

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // all middlewares related to security can found here
  securityMiddleware(app);

// to check the api status
  app.get("/health", (req, res) => {
    res.json({
      message: "api is healthy",
    });
  });

<<<<<<< HEAD
  app.use('/api/auth',authRoutes)
  app.use('/api/team',privateTeamRoutes)
  app.use('/api/team',publicTeamRoutes)
=======
  app.use("/api/auth", authRouter);
  app.use("/api/series", privateSeriesRouter);
  app.use("/api/series", publicSeriesRouter);
>>>>>>> 9f35055c626c6c8d19bef2cc4cd569d2a8b85573

  app.use(notFound);
  app.use(ErrorHandler);

  return app;
}