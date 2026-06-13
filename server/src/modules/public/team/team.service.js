import TeamRepo from "../../../repository/team.repository.js";

export default class TeamService {
  constructor() {
    this.teamRepo = new TeamRepo();
  }

  async getTeams() {
    return await this.teamRepo.findAll();
  }

  async getTeamById(id) {
    return await this.teamRepo.findById(id);
  }
}
