import express from "express";
import TeamController from "./team.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

const router = express.Router();
const teamController = new TeamController();

router.get("/", asyncHandler(teamController.getAllTeam.bind(teamController)));

router.get(
  "/:id",
  asyncHandler(teamController.getTeamById.bind(teamController)),
);

router.get(
  "/:teamId/squad",
  asyncHandler(teamController.getTeamSquad.bind(teamController)),
);

export default router