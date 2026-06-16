import express from "express";

import scoreController from "./score.controller.js";
import {
  createScoreValidator,
  updateScoreValidator,
} from "./score.validator.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import {
  authenticateMiddleware,
  authorizeRole,
} from "../../../middlewares/auth.middleware.js";
import { validateErrors } from "../../../middlewares/validate.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN", "SCORER"]),
  createScoreValidator,
  validateErrors,
  asyncHandler(scoreController.createScore.bind(scoreController)),
);

router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["SUPER_ADMIN", "SCORER"]),
  updateScoreValidator,
  validateErrors,
  asyncHandler(scoreController.updateScore.bind(scoreController)),
);

export default router;
