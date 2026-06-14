import teamModel from "../model/team.model.js";

export default class TeamRepo {
  async create(payload) {
    return await teamModel.create(payload);
  }
  async findAll() {
    return await teamModel
      .find({ isDeleted: false })
      .populate("squadPlayers", "name image role country")
      .lean();
  }

  async findById(id) {
    return await teamModel
      .findOne({ _id: id, isDeleted: false })
      .populate("squadPlayers", "name image role country")
      .lean();
  }

  async updateById(id, payload) {
    return await teamModel
      .findByIdAndUpdate(id, payload, { new: true })
      .populate("squadPlayers", "name image role country")
      .lean();
  }

  async deleteById(id) {
    return await teamModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }

  // add remove and get players from squad
  async getSquad(teamId) {
    return await teamModel
      .findById(teamId)
      .select("name logo squadPlayers")
      .populate("squadPlayers")
      .lean();
  }
  async addPlayer(teamId, playerId) {
    return await teamModel
      .findByIdAndUpdate(
        teamId,
        {
          $addToSet: { squadPlayers: playerId },
        },
        { new: true },
      )
      .populate("squadPlayers", "name imageUrl role country")
      .lean();
  }

  async removePlayer(teamId, playerId) {
    return await teamModel
      .findByIdAndUpdate(
        teamId,
        {
          $pull: { squadPlayers: playerId },
        },
        { new: true },
      )
      .populate("squadPlayers", "name imageUrl role country")
      .lean();
  }

  // end
}
