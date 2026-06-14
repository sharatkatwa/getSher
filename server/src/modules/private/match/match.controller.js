import { StatusCodes } from "http-status-codes";
import matchService from "./match.service.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";


class MatchController {
  createMatch = asyncHandler(async (req, res) => {
    const matchData = {
      ...req.body,
      createdBy: req.user?._id,
    };

    const newMatch = await matchService.createMatch(matchData);

    return buildSuccessResponse(
      res,
      "Match scheduled successfully",
      StatusCodes.CREATED,
      newMatch,
    );
  });

  updateMatch = asyncHandler(async (req, res) => {
    const updateData = {
      ...req.body,
      updatedBy: req.user?._id,
    };

    const updatedMatch = await matchService.updateMatch(
      req.params.id,
      updateData
    );

    return buildSuccessResponse(
      res,
      "Match information updated successfully",
      StatusCodes.OK,
      updatedMatch,
    );
  });

  updatePlayingXI = asyncHandler(async (req, res) => {
    const updatedMatch = await matchService.updatePlayingXI(
      req.params.id,
      req.body
    );

    return buildSuccessResponse(
      res,
      "Playing XI lineups updated successfully",
      StatusCodes.OK,
      updatedMatch,
    );
  });

  deleteMatch = asyncHandler(async (req, res) => {
    const userId = req.user?._id || null;

    const result = await matchService.deleteMatch(
      req.params.id,
      userId
    );

    return buildSuccessResponse(
      res,
      result.message,
      StatusCodes.OK,
      result.data ?? null,
    );
  });
}

export default new MatchController();
