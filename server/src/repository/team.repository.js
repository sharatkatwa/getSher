import Team from "../model/team.model.js";

class TeamRepository {
  async findById(teamId) {
    return await Team.findOne({
      _id: teamId,
      isDeleted: false,
    });
  }

  async exists(teamId) {
    return await Team.exists({
      _id: teamId,
      isDeleted: false,
    });
  }
}

export default new TeamRepository();