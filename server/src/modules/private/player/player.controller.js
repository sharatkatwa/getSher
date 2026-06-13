import { StatusCodes } from "http-status-codes";
import PlayerService from "./player.service.js";

export default class PlayerController {
  constructor() {
    this.playerService = new PlayerService();
  }

  async createPlayer(req, res, next) {
    try {
      const player = await this.playerService.createPlayer(req.body);

      res.status(StatusCodes.CREATED).json({
        success: true,
        data: player,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePlayer(req, res, next) {
    try {
      const player = await this.playerService.updatePlayer(
        req.params.id,
        req.body
      );

      res.status(StatusCodes.OK).json({
        success: true,
        data: player,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePlayer(req, res, next) {
    try {
      const player = await this.playerService.deletePlayer(req.params.id);

      res.status(StatusCodes.OK).json({
        success: true,
        data: player,
      });
    } catch (error) {
      next(error);
    }
  }
}