import mongoose from "mongoose";

import { MATCH_STATUS } from "../../../constants/model.constant.js";
import matchRepository from "../../../repository/match.repository.js";
import scoreRepository from "../../../repository/score.repository.js";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../../shared/error/custom.errors.js";

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

  validateScorePayload(payload, { isCreate = false } = {}) {
    if (isCreate) {
      const requiredFields = ["matchId", "innings", "battingTeam"];

      for (const field of requiredFields) {
        if (payload[field] === undefined || payload[field] === "") {
          throw new ValidationError(`${field} is required`);
        }
      }
    }

    if (payload.matchId) {
      validateObjectId(payload.matchId, "match id");
    }

    if (payload.battingTeam) {
      validateObjectId(payload.battingTeam, "batting team id");
    }

    if (payload.innings !== undefined && ![1, 2].includes(Number(payload.innings))) {
      throw new ValidationError("Innings must be 1 or 2");
    }

    if (payload.score !== undefined && Number(payload.score) < 0) {
      throw new ValidationError("Score cannot be negative");
    }

    if (
      payload.wickets !== undefined &&
      (!Number.isInteger(Number(payload.wickets)) ||
        Number(payload.wickets) < 0 ||
        Number(payload.wickets) > 10)
    ) {
      throw new ValidationError("Wickets must be between 0 and 10");
    }

    if (payload.overs !== undefined && !/^\d+\.[0-5]$/.test(payload.overs)) {
      throw new ValidationError("Overs must be in X.Y format where Y is 0-5");
    }

    if (payload.runRate !== undefined && Number(payload.runRate) < 0) {
      throw new ValidationError("Run rate cannot be negative");
    }

    if (payload.target !== undefined && Number(payload.target) < 0) {
      throw new ValidationError("Target cannot be negative");
    }
  }

  validateBattingTeam(match, battingTeam) {
    const battingTeamId = String(battingTeam);
    const teamIds = [getId(match.team1), getId(match.team2)];

    if (!teamIds.includes(battingTeamId)) {
      throw new ValidationError("Batting team must be one of the match teams");
    }
  }

  async createScore(payload, userId) {
    this.validateScorePayload(payload, { isCreate: true });

    const match = await this.ensureLiveMatch(payload.matchId);
    this.validateBattingTeam(match, payload.battingTeam);

    const existingScore = await scoreRepository.findByMatchAndInnings(
      payload.matchId,
      payload.innings,
    );

    if (existingScore) {
      throw new ConflictError("Score already exists for this innings");
    }

    return await scoreRepository.create({
      ...payload,
      innings: Number(payload.innings),
      score: Number(payload.score || 0),
      wickets: Number(payload.wickets || 0),
      runRate: Number(payload.runRate || 0),
      target: payload.target === undefined ? undefined : Number(payload.target),
      createdBy: userId,
      updatedBy: userId,
    });
  }

  async updateScore(scoreId, payload, userId) {
    validateObjectId(scoreId, "score id");

    const score = await scoreRepository.findById(scoreId);

    if (!score) {
      throw new NotFoundError("Score not found");
    }

    const matchId = getId(score.matchId);
    const match = await this.ensureLiveMatch(matchId);

    this.validateScorePayload(payload);

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

    return updatedScore;
  }

  async getScoresByMatch(matchId) {
    validateObjectId(matchId, "match id");

    const match = await matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    return await scoreRepository.findByMatch(matchId);
  }
}

export default new ScoreService();
