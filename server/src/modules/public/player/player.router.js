import express from "express";
import PlayerController from "./player.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();
const playerController = new PlayerController();

router.get("/", asyncHandler(playerController.getPlayers.bind(playerController)));
router.get("/:id", asyncHandler(playerController.getPlayerById.bind(playerController)));

export default router;