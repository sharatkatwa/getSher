import { StatusCodes } from "http-status-codes";

import ScoreService from "./score.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class ScoreController {
  constructor() {
    this.scoreService = new ScoreService();
  }

  async getScoresByMatch(req, res) {
    const scores = await this.scoreService.getScoresByMatch(req.params.matchId);

    return buildSuccessResponse(
      res,
      "Match scores fetched successfully",
      StatusCodes.OK,
      scores,
    );
  }
}
