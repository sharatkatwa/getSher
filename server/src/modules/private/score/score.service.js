import mongoose from "mongoose";

import { MATCH_STATUS } from "../../../constants/model.constant.js";
import matchRepository from "../../../repository/match.repository.js";
import scoreRepository from "../../../repository/score.repository.js";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../../shared/error/custom.errors.js";
import { emitToMatch } from "../../../sockets/socketGateway.js";

const validateObjectId = (id, fieldName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError(`Invalid ${fieldName}`);
  }
};

const getId = (value) => String(value?._id || value);

class ScoreService {
  async ensureLiveMatch(matchId) {
    validateObjectId(matchId, "match id");

    const match = await matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    if (match.status !== MATCH_STATUS.LIVE) {
      throw new ValidationError("Score can only be changed for a live match");
    }

    return match;
  }

  validateBattingTeam(match, battingTeam) {
    const battingTeamId = String(battingTeam);
    const teamIds = [getId(match.team1), getId(match.team2)];

    if (!teamIds.includes(battingTeamId)) {
      throw new ValidationError("Batting team must be one of the match teams");
    }
  }

  async createScore(payload, userId) {
    const match = await this.ensureLiveMatch(payload.matchId);
    this.validateBattingTeam(match, payload.battingTeam);

    const existingScore = await scoreRepository.findByMatchAndInnings(
      payload.matchId,
      payload.innings,
    );

    if (existingScore) {
      throw new ConflictError("Score already exists for this innings");
    }

    const newScore = await scoreRepository.create({
      ...payload,
      innings: Number(payload.innings),
      score: Number(payload.score || 0),
      wickets: Number(payload.wickets || 0),
      runRate: Number(payload.runRate || 0),
      target: payload.target === undefined ? undefined : Number(payload.target),
      createdBy: userId,
      updatedBy: userId,
    });

    emitToMatch(payload.matchId, "score.created", newScore);

    return newScore;
  }

  async updateScore(scoreId, payload, userId) {
    validateObjectId(scoreId, "score id");

    const score = await scoreRepository.findById(scoreId);

    if (!score) {
      throw new NotFoundError("Score not found");
    }

    const matchId = getId(score.matchId);
    const match = await this.ensureLiveMatch(matchId);

    if (payload.battingTeam) {
      this.validateBattingTeam(match, payload.battingTeam);
    }

    const allowedFields = [
      "battingTeam",
      "score",
      "wickets",
      "overs",
      "runRate",
      "target",
    ];
    const safePayload = { updatedBy: userId };

    for (const field of allowedFields) {
      if (payload[field] !== undefined) {
        safePayload[field] = payload[field];
      }
    }

    if (safePayload.score !== undefined) {
      safePayload.score = Number(safePayload.score);
    }

    if (safePayload.wickets !== undefined) {
      safePayload.wickets = Number(safePayload.wickets);
    }

    if (safePayload.runRate !== undefined) {
      safePayload.runRate = Number(safePayload.runRate);
    }

    if (safePayload.target !== undefined) {
      safePayload.target = Number(safePayload.target);
    }

    const updatedScore = await scoreRepository.updateById(scoreId, safePayload);

    if (!updatedScore) {
      throw new NotFoundError("Score not found");
    }

    emitToMatch(matchId, "score.updated", updatedScore);

    return updatedScore;
  }
}

export default new ScoreService();
