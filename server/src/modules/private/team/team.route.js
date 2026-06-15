import express from "express";
import TeamController from "./team.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import {
  authenticateMiddleware,
  authorizeRole,
} from "../../../middlewares/auth.middleware.js";
import { teamValidator } from "./team.validator.js";
import { validateErrors } from "../../../middlewares/validate.middleware.js";

const router = express.Router();
const teamController = new TeamController();

router.post(
  "/",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  teamValidator,
  validateErrors,
  asyncHandler(teamController.createTeam.bind(teamController)),
);

router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  teamValidator,
  validateErrors,
  asyncHandler(teamController.updateTeam.bind(teamController)),
);

router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  asyncHandler(teamController.deleteTeam.bind(teamController)),
);

// Add and remove squad routes
router.post(
  "/:teamId/squad",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  asyncHandler(teamController.addPlayerToSquad.bind(teamController)),
);

router.delete(
  "/:teamId/squad/:playerId",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  asyncHandler(teamController.removePlayerFromSquad.bind(teamController)),
);

export default router;
