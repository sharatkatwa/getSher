import mongoose from "mongoose";

import commentaryRepository from "../../../repository/commentary.repository.js";
import matchRepository from "../../../repository/match.repository.js";
import {
  NotFoundError,
  ValidationError,
} from "../../../shared/error/custom.errors.js";

export default class CommentaryService {
  async getCommentaryByMatch(matchId) {
    if (!mongoose.Types.ObjectId.isValid(matchId)) {
      throw new ValidationError("Invalid match id");
    }

    const match = await matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    return await commentaryRepository.findByMatch(matchId);
  }
}
