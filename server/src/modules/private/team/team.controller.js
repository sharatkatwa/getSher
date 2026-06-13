import { StatusCodes } from "http-status-codes";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import TeamService from "./team.service.js";

export default class TeamController {
  constructor() {
    this.teamService = new TeamService();
  }

  async createTeam(req, res) {
    const payload = {
      name: req.body.name,
      shortName: req.body.shortName,
      logo: req.body.logo,
      primaryColor: req.body.primaryColor,
      createdBy: req.user._id,
    };

    const team = await this.teamService.createTeam(payload);

    // buildResponse function used to send response
    buildSuccessResponse(
      res,
      "Team Created Successfully",
      StatusCodes.CREATED.data,
    );
  }

  async updateTeam(req, res) {
    const id = req.params.id;
    const payload = req.body;
    const updatedTeam = await this.teamService.updateTeam(id, payload);

    buildSuccessResponse(
      res,
      "Team updated successfully",
      StatusCodes.OK,
      updatedTeam,
    );
  }
  
  async deleteTeam(req, res) {
    await teamService.deleteTeam(req.params.id);
  }

// add and remove SQUAD controllers
  async addPlayerToSquad(req, res) {
    const team = await this.teamService.addPlayerToSquad(
      req.body.playerId,
      req.params.teamId,
    );

    buildSuccessResponse(
      res,
      "player added successfully in the team",
      StatusCodes.OK,
      team,
    );
  }
  
  async removePlayerFromSquad(req, res) {
    const { playerId, teamId } = req.params;
    const team = await this.teamService.removePlayerFromSquad(playerId, teamId);

    buildSuccessResponse(
      res,
      "player removed successfully in the team",
      StatusCodes.OK,
      team,
    );
  }
}
