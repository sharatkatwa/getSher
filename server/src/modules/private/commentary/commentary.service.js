import mongoose from "mongoose";

import { MATCH_STATUS } from "../../../constants/model.constant.js";
import commentaryRepository from "../../../repository/commentary.repository.js";
import matchRepository from "../../../repository/match.repository.js";
import {
  NotFoundError,
  ValidationError,
} from "../../../shared/error/custom.errors.js";

const validateObjectId = (id, fieldName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError(`Invalid ${fieldName}`);
  }
};

const getId = (value) => String(value?._id || value);

class CommentaryService {
  async ensureLiveMatch(matchId) {
    validateObjectId(matchId, "match id");

    const match = await matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    if (match.status !== MATCH_STATUS.LIVE) {
      throw new ValidationError("Commentary can only be changed for a live match");
    }

    return match;
  }

  async addCommentary(payload, userId) {
    await this.ensureLiveMatch(payload.matchId);

    return await commentaryRepository.create({
      ...payload,
      over: Number(payload.over),
      ball: Number(payload.ball),
      createdBy: userId,
    });
  }

  async deleteCommentary(commentaryId) {
    validateObjectId(commentaryId, "commentary id");

    const commentary = await commentaryRepository.findById(commentaryId);

    if (!commentary) {
      throw new NotFoundError("Commentary not found");
    }

    await this.ensureLiveMatch(getId(commentary.matchId));

    return await commentaryRepository.deleteById(commentaryId);
  }
}

export default new CommentaryService();
