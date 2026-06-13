import express from "express";
import PlayerController from "./player.controller.js";

const router = express.Router();
const playerController = new PlayerController();

router.get("/", playerController.getPlayers.bind(playerController));


router.get("/:id", playerController.getPlayerById.bind(playerController));

export default router;