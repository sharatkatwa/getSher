import PlayerRepo from "../../../repository/player.repository.js";
import TeamRepo from "../../../repository/team.repository.js";
import {
  ConflictError,
  NotFoundError,
} from "../../../shared/error/custom.errors.js";

export default class TeamService {
  constructor() {
    this.teamRepo = new TeamRepo();
    this.playerRepo = new PlayerRepo();
  }

  async createTeam(team) {
    return await this.teamRepo.create(team);
  }
  async updateTeam(id, payload) {
    const team = await this.teamRepo.findById(id);
    if (!team) throw new NotFoundError("team not found");

    return await this.teamRepo.updateById(id, payload);
  }
  async deleteTeam(id) {
    const team = await this.teamRepo.findById(id);
    if (!team) throw new NotFoundError("team not found");

    return await this.teamRepo.deleteById(id);
  }

  async addPlayerToSquad(playerId, teamId) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new NotFoundError("Team Not Found");
    const player = await this.playerRepo.findById(playerId);
    if (!player) throw new NotFoundError("Player not Found");

    const playerExists = team.squadPlayers.some(
      (id) => id.toString() === playerId,
    );

    if (playerExists) throw new ConflictError("Player already exist in squad");

    return await this.teamRepo.addPlayer(teamId, playerId);
  }
  async removePlayerFromSquad(playerId, teamId) {
    const team = await this.teamRepo.findById(teamId);
    if (!team) throw new NotFoundError("Team Not Found");
    const player = await this.playerRepo.findById(playerId);
    if (!player) throw new NotFoundError("Player not Found");

    const playerExists = team.squadPlayers.some(
      (id) => id.toString() === playerId,
    );

    if (!playerExists)
      throw new NotFoundError("Player doesn't exist in the squad");

    return await this.teamRepo.removePlayer(teamId, playerId);
  }

  // end
}
