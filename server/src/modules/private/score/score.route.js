import express from "express";

import scoreController from "./score.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import {
  authenticateMiddleware,
  authorizeRole,
} from "../../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN", "SCORER"]),
  asyncHandler(scoreController.createScore.bind(scoreController)),
);

router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN", "SCORER"]),
  asyncHandler(scoreController.updateScore.bind(scoreController)),
);

router.get(
  "/match/:matchId",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN", "SCORER"]),
  asyncHandler(scoreController.getScoresByMatch.bind(scoreController)),
);

export default router;
