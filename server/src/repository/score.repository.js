import Score from "../model/score.model.js";

class ScoreRepository {
  async create(payload) {
    return await Score.create(payload);
  }

  async findById(id) {
    return await Score.findById(id)
      .populate("matchId", "matchNumber status venue startTime")
      .populate("battingTeam", "name shortName logo")
      .lean();
  }

  async findByMatchAndInnings(matchId, innings) {
    return await Score.findOne({ matchId, innings }).lean();
  }

  async findByMatch(matchId) {
    return await Score.find({ matchId })
      .sort({ innings: 1 })
      .populate("battingTeam", "name shortName logo")
      .lean();
  }

  async updateById(id, payload) {
    return await Score.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })
      .populate("matchId", "matchNumber status venue startTime")
      .populate("battingTeam", "name shortName logo")
      .lean();
  }
}

export default new ScoreRepository();
