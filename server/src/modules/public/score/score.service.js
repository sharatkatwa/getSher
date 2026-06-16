import mongoose from "mongoose";

import matchRepository from "../../../repository/match.repository.js";
import scoreRepository from "../../../repository/score.repository.js";
import {
  NotFoundError,
  ValidationError,
} from "../../../shared/error/custom.errors.js";

export default class ScoreService {
  async getScoresByMatch(matchId) {
    if (!mongoose.Types.ObjectId.isValid(matchId)) {
      throw new ValidationError("Invalid match id");
    }

    const match = await matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    return await scoreRepository.findByMatch(matchId);
  }
}
