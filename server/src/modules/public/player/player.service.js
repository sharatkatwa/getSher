import PlayerRepo from "../../../repository/player.repository.js";

export default class PlayerService {
  constructor() {
    this.playerRepo = new PlayerRepo();
  }

  async getPlayers() {
    return await this.playerRepo.findAll();
  }

  async getPlayerById(id) {
    return await this.playerRepo.findById(id);
  }
}