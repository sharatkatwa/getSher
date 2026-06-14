import { StatusCodes } from "http-status-codes";
import MatchService from "./match.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class MatchController {
  constructor() {
    this.matchService = new MatchService();
  }

  async getMatchById(req, res) {
    const match = await this.matchService.getMatchById(req.params.id);

    return buildSuccessResponse(
      res,
      "Match fetched successfully",
      StatusCodes.OK,
      match,
    );
  }

  async getAllMatches(req, res) {
    const result = await this.matchService.getAllMatches(req.query);

    return buildSuccessResponse(
      res,
      "Matches fetched successfully",
      StatusCodes.OK,
      result,
    );
  }

  async getMatchesByStatus(req, res) {
    const result = await this.matchService.getMatchesByStatus(
      req.params.status,
      req.query,
    );

    return buildSuccessResponse(
      res,
      "Matches fetched successfully",
      StatusCodes.OK,
      result,
    );
  }

  async getMatchesBySeries(req, res) {
    const matches = await this.matchService.getMatchesBySeries(
      req.params.seriesId,
    );

    return buildSuccessResponse(
      res,
      "Series matches fetched successfully",
      StatusCodes.OK,
      matches,
    );
  }

  async getMatchesByTeam(req, res) {
    const matches = await this.matchService.getMatchesByTeam(req.params.teamId);

    return buildSuccessResponse(
      res,
      "Team matches fetched successfully",
      StatusCodes.OK,
      matches,
    );
  }
}
