import mongoose from "mongoose";
import TeamRepo from "../../../repository/team.repository.js";
import { ValidationError } from "../../../shared/error/custom.errors.js";

export default class TeamService {
  constructor() {
    this.teamRepo = new TeamRepo();
  }

  async getTeams() {
    return await this.teamRepo.findAll();
  }

  async getTeamById(id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ValidationError("invalid teamId");
      
    return await this.teamRepo.findById(id);
  }

  async getSquad(id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ValidationError("invalid teamId");
      
    return await this.teamRepo.getSquad();
  }
}
