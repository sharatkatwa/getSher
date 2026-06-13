import express from "express";
import PlayerController from "./player.controller.js";

const router = express.Router();
const playerController = new PlayerController();

router.post("/", playerController.createPlayer.bind(playerController));
router.patch("/:id", playerController.updatePlayer.bind(playerController));
router.delete("/:id", playerController.deletePlayer.bind(playerController));

export default router;