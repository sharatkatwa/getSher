import express from "express";
import matchController from "./match.controller.js";
import {
  authenticateMiddleware,
  authorizeRole,
} from "../../../middlewares/auth.middleware.js";
import {
  createMatchValidator,
  updateMatchValidator,
  playingXIValidator,
} from "./match.validator.js";

import { validateErrors } from "../../../middlewares/validate.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  createMatchValidator,
  validateErrors,
  matchController.createMatch
);

router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  updateMatchValidator,
  validateErrors,
  matchController.updateMatch
);

router.patch(
  "/:id/playing-xi",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  playingXIValidator,
  validateErrors,
  matchController.updatePlayingXI
);

router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  matchController.deleteMatch
);

export default router;
