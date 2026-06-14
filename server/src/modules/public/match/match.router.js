import express from "express";
import MatchController from "./match.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();
const matchController = new MatchController();

router.get(
  "/",
  asyncHandler(matchController.getAllMatches.bind(matchController)),
);
router.get(
  "/status/:status",
  asyncHandler(matchController.getMatchesByStatus.bind(matchController)),
);
router.get(
  "/series/:seriesId",
  asyncHandler(matchController.getMatchesBySeries.bind(matchController)),
);
router.get(
  "/team/:teamId",
  asyncHandler(matchController.getMatchesByTeam.bind(matchController)),
);
router.get(
  "/:id",
  asyncHandler(matchController.getMatchById.bind(matchController)),
);

export default router;
