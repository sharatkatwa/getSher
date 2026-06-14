import mongoose from "mongoose";
import matchRepository from "../../../repository/match.repository.js";
import { MATCH_STATUS } from "../../../constants/match.constants.js";
import {
  NotFoundError,
  ValidationError,
} from "../../../shared/error/custom.errors.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const parsePositiveInteger = (value, fallback, fieldName) => {
  if (value === undefined) {
    return fallback;
  }

  const parsedValue = Number(value);
  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    throw new ValidationError(`${fieldName} must be a positive integer.`);
  }

  return parsedValue;
};

const validateObjectId = (value, fieldName) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new ValidationError(`Invalid ${fieldName}.`);
  }
};

export default class MatchService {
  getPagination(query = {}) {
    const page = parsePositiveInteger(query.page, DEFAULT_PAGE, "Page");
    const limit = parsePositiveInteger(query.limit, DEFAULT_LIMIT, "Limit");

    if (limit > MAX_LIMIT) {
      throw new ValidationError(`Limit cannot exceed ${MAX_LIMIT}.`);
    }

    return { page, limit };
  }

  async getMatchById(matchId) {
    validateObjectId(matchId, "match ID");

    const match = await matchRepository.findById(matchId);
    if (!match) {
      throw new NotFoundError("Match not found.");
    }

    return match;
  }

  async getAllMatches(query) {
    const pagination = this.getPagination(query);
    const matches = await matchRepository.findAll(pagination);

    return {
      matches,
      count: matches.length,
      pagination,
    };
  }

  async getMatchesByStatus(status, query) {
    const normalizedStatus = status.toUpperCase();
    if (!Object.values(MATCH_STATUS).includes(normalizedStatus)) {
      throw new ValidationError("Invalid match status.");
    }

    const pagination = this.getPagination(query);
    const matches = await matchRepository.findByStatus(
      normalizedStatus,
      pagination,
    );

    return {
      matches,
      count: matches.length,
      pagination,
    };
  }

  async getMatchesBySeries(seriesId) {
    validateObjectId(seriesId, "series ID");
    return await matchRepository.findBySeries(seriesId);
  }

  async getMatchesByTeam(teamId) {
    validateObjectId(teamId, "team ID");
    return await matchRepository.findByTeam(teamId);
  }
}
