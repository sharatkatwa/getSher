import { StatusCodes } from "http-status-codes";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import TeamService from "./team.service.js";

export default class TeamController {
  constructor() {
    this.teamService = new TeamService()
  }

  async getAllTeam(req, res) {
    const teams = await this.teamService.getTeams()
    buildSuccessResponse(res,'all teams fetched successfully',StatusCodes.OK,teams)
  }
  async getTeamById(req, res) {
    const team = await this.teamService.getTeamById(id)
    buildSuccessResponse(res,'team fetched successfully', StatusCodes.OK,team)
  }

  async getTeamSquad(req, res) {
    const squad = await this.teamService.getSquad(req.params.teamId)
    buildSuccessResponse(res,"squad fetched successfully", StatusCodes.OK, squad)
  }
}
