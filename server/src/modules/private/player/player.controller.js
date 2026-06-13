import { StatusCodes } from "http-status-codes";
import PlayerService from "./player.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildResponse.js";

export default class PlayerController {
  constructor() {
    this.playerService = new PlayerService();
  }

  async createPlayer(req, res) {
    const player = await this.playerService.createPlayer(req.body);

    return buildSuccessResponse(
      res,
      player,
      "Player created successfully",
      StatusCodes.CREATED
    );
  }

  async updatePlayer(req, res) {
    const player = await this.playerService.updatePlayer(req.params.id, req.body);

    return buildSuccessResponse(
      res,
      player,
      "Player updated successfully",
      StatusCodes.OK
    );
  }

  async deletePlayer(req, res) {
    const player = await this.playerService.deletePlayer(req.params.id);

    return buildSuccessResponse(
      res,
      player,
      "Player deleted successfully",
      StatusCodes.OK
    );
  }
}