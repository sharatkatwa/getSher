import { StatusCodes } from "http-status-codes";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import TeamService from "./team.service.js";

export default class TeamController {
  constructor() {
    this.teamService = new TeamService();
  }

  async createTeam(req, res) {
    const team = await this.teamService.createTeam(req.body, req.user.id);

    // buildResponse for sending success response
    return buildSuccessResponse(
      res,
      "Team Created Successfully",
      StatusCodes.CREATED.data,
      team
    );
  }

  async updateTeam(req, res) {
    const id = req.params.id;
    const payload = req.body;
    const updatedTeam = await this.teamService.updateTeam(id, payload);

    return buildSuccessResponse(
      res,
      "Team updated successfully",
      StatusCodes.OK,
      updatedTeam,
    );
  }

  async deleteTeam(req, res) {
    await this.teamService.deleteTeam(req.params.id);
    return buildSuccessResponse(res, "team deleted successfully");
  }

  // add and remove SQUAD controllers
  async addPlayerToSquad(req, res) {
    const team = await this.teamService.addPlayerToSquad(
      req.body.playerId,
      req.params.teamId,
    );

    return buildSuccessResponse(
      res,
      "player added successfully in the team",
      StatusCodes.OK,
      team,
    );
  }

  async removePlayerFromSquad(req, res) {
    const { playerId, teamId } = req.params;
    const team = await this.teamService.removePlayerFromSquad(playerId, teamId);

    return buildSuccessResponse(
      res,
      "player removed successfully in the team",
      StatusCodes.OK,
      team,
    );
  }
}
