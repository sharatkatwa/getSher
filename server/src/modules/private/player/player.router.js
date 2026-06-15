import express from "express";
import PlayerController from "./player.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import {  authenticateMiddleware,authorizeRole, } from "../../../middlewares/auth.middleware.js";
import { playerValidator } from "./player.validator.js";
import { validateErrors } from "../../../middlewares/validate.middleware.js";

const router = express.Router();
const playerController = new PlayerController();

router.post(
  "/",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  playerValidator,
  validateErrors,
  asyncHandler(playerController.createPlayer.bind(playerController)),
);

router.patch(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  playerValidator,
  validateErrors,
  asyncHandler(playerController.updatePlayer.bind(playerController)),
);

router.delete(
  "/:id",
  authenticateMiddleware,
  authorizeRole(["ADMIN", "SUPER_ADMIN"]),
  asyncHandler(playerController.deletePlayer.bind(playerController)),
);

export default router;
