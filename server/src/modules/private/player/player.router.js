import express from "express";
import PlayerController from "./player.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();
const playerController = new PlayerController();

router.post("/", asyncHandler(playerController.createPlayer.bind(playerController)));
router.patch("/:id", asyncHandler(playerController.updatePlayer.bind(playerController)));
router.delete("/:id", asyncHandler(playerController.deletePlayer.bind(playerController)));

export default router;