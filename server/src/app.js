import express from "express";
import env from "./config/env.js";
import morgan from "morgan";

// middleware import statements
import ErrorHandler from "./middlewares/errorHandler.middleware.js";
import securityMiddleware from "./middlewares/security.middleware.js";
import googleOAuthMiddleware from "./middlewares/googleOAuth.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

>>>>>>> ead4760 (feat: series featues completed from my side)
// routes import statements
import authRouter from "./modules/public/auth/auth.router.js";
import publicMatchRouter from "./modules/public/match/match.router.js";
import privateMatchRouter from "./modules/private/match/match.route.js";

// routes import statements for private and public series
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

  app.get("/health", (req, res) => {
    res.json({
      message: "api is healthy",
    });
  });

  app.use("/api/auth", authRouter);

  app.use("/api/matches", publicMatchRouter);
  app.use("/api/matches", privateMatchRouter);

  app.use("/api/private/series", privateSeriesRouter);
  app.use("/api/series", publicSeriesRouter);

  app.use(notFound);
  app.use(ErrorHandler);

  return app;
}
