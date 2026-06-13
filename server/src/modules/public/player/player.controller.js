import { StatusCodes } from "http-status-codes";
import PlayerService from "./player.service.js";

export default class PlayerController {
  constructor() {
    this.playerService = new PlayerService();
  }

  async getPlayers(req, res, next) {
    try {
      const players = await this.playerService.getPlayers();

      res.status(StatusCodes.OK).json({
        success: true,
        data: players,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPlayerById(req, res, next) {
    try {
      const player = await this.playerService.getPlayerById(req.params.id);

      res.status(StatusCodes.OK).json({
        success: true,
        data: player,
      });
    } catch (error) {
      next(error);
    }
  }
}