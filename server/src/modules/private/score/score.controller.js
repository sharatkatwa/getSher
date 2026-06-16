import { StatusCodes } from "http-status-codes";

import scoreService from "./score.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

class ScoreController {
  async createScore(req, res) {
    const userId = req.user?.id || req.user?._id || null;
    const score = await scoreService.createScore(req.body, userId);

    return buildSuccessResponse(
      res,
      "Score created successfully",
      StatusCodes.CREATED,
      score,
    );
  }

  async updateScore(req, res) {
    const userId = req.user?.id || req.user?._id || null;
    const score = await scoreService.updateScore(req.params.id, req.body, userId);

    return buildSuccessResponse(
      res,
      "Score updated successfully",
      StatusCodes.OK,
      score,
    );
  }
}

export default new ScoreController();
