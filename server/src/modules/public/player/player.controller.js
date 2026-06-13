import { StatusCodes } from "http-status-codes";
import PlayerService from "./player.service.js";
import { buildSuccessResponse } from "../../../shared/utils/buildResponse.js";

export default class PlayerController {
  constructor() {
    this.playerService = new PlayerService();
  }

  async getPlayers(req, res) {
    const players = await this.playerService.getPlayers();

    return buildSuccessResponse(
      res,
      players,
      "Players fetched successfully",
      StatusCodes.OK
    );
  }

  async getPlayerById(req, res) {
    const player = await this.playerService.getPlayerById(req.params.id);

    return buildSuccessResponse(
      res,
      player,
      "Player fetched successfully",
      StatusCodes.OK
    );
  }
}