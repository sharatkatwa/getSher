import express from "express";
import env from "./config/env.js";
import morgan from "morgan";

// middleware import statements
import ErrorHandler from "./middlewares/errorHandler.middleware.js";
import securityMiddleware from "./middlewares/security.middleware.js";
import googleOAuthMiddleware from "./middlewares/googleOAuth.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

// routes import statements
import authRoutes from "./modules/public/auth/auth.router.js";
import privateTeamRoutes from "./modules/private/team/team.route.js";
import publicTeamRoutes from "./modules/public/team/team.route.js";
import privateSeriesRoutes from "./modules/private/series/series.router.js";
import publicSeriesRoutes from "./modules/public/series/series.router.js";
import publicMatchRoutes from "./modules/public/match/match.router.js";
import privateMatchRoutes from "./modules/private/match/match.route.js";
import publicPlayerRoutes from "./modules/public/player/player.router.js";
import privatePlayerRoutes from "./modules/private/player/player.router.js";
import privateUserRoutes from "./modules/private/user/user.route.js";
import privateScoreRoutes from "./modules/private/score/score.route.js";
import publicScoreRoutes from "./modules/public/score/score.route.js";
import publicCommentaryRoutes from "./modules/public/commentary/commentary.route.js";
import privateCommentaryRoutes from "./modules/private/commentary/commentary.route.js";

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

  // Public Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/series", publicSeriesRoutes);
  app.use("/api/team", publicTeamRoutes);
  app.use("/api/match", publicMatchRoutes);
  app.use("/api/player", publicPlayerRoutes);
  app.use("/api/scores", publicScoreRoutes);
  app.use("/api/commentary", publicCommentaryRoutes);

  // Private Routes
  app.use("/api/series", privateSeriesRoutes);
  app.use("/api/team", privateTeamRoutes);
  app.use("/api/match", privateMatchRoutes);
  app.use("/api/player", privatePlayerRoutes);
  app.use("/api/users", privateUserRoutes);
  app.use("/api/scores", privateScoreRoutes);
  app.use("/api/commentary", privateCommentaryRoutes);

  app.use(notFound);
  app.use(ErrorHandler);

  return app;
}
