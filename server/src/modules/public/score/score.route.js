import express from "express";

import ScoreController from "./score.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();
const scoreController = new ScoreController();

router.get(
  "/match/:matchId",
  asyncHandler(scoreController.getScoresByMatch.bind(scoreController)),
);

export default router;
