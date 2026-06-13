import { StatusCodes } from "http-status-codes";
import PlayerService from "./player.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";

export default class PlayerController {
  constructor() {
    this.playerService = new PlayerService();
  }

  async createPlayer(req, res) {
    const player = await this.playerService.createPlayer(req.body);

    return buildSuccessResponse(
      res,
      "Player created successfully",
      StatusCodes.CREATED,
      player
    );
  }

  async updatePlayer(req, res) {
    const player = await this.playerService.updatePlayer(
      req.params.id,
      req.body
    );

    return buildSuccessResponse(
      res,
      "Player updated successfully",
      StatusCodes.OK,
      player
    );
  }

  async deletePlayer(req, res) {
    const player = await this.playerService.deletePlayer(req.params.id);

    return buildSuccessResponse(
      res,
      "Player deleted successfully",
      StatusCodes.OK,
      player
    );
  }
}