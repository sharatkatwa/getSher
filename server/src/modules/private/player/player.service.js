import PlayerRepo from "../../../repository/player.repository.js";

export default class PlayerService {
  constructor() {
    this.playerRepo = new PlayerRepo();
  }

  async createPlayer(payload) {
    return await this.playerRepo.create(payload);
  }

  async updatePlayer(id, payload) {
    return await this.playerRepo.updateById(id, payload);
  }

  async deletePlayer(id) {
    return await this.playerRepo.deleteById(id);
  }
}