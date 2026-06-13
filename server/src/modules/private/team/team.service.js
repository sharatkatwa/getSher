import TeamRepo from "../../../repository/team.repository.js";

export default class TeamService {
  constructor() {
    this.teamRepo = new TeamRepo();
  }

  async createTeam(team) {
    return await this.teamRepo.create(team);
  }
  async updateTeam(id, payload) {
    return await this.teamRepo.updateById(id, payload);
  }
  async deleteTeam(id) {
    return await this.teamRepo.deleteById(id);
  }

  async addPlayerToSquad(playerId, teamId) {}
  async removePlayerFromSquad(playerId, teamId) {}
}
