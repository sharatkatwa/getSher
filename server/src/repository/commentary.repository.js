import Commentary from "../model/commentary.model.js";

class CommentaryRepository {
  async create(payload) {
    return await Commentary.create(payload);
  }

  async findById(id) {
    return await Commentary.findById(id)
      .populate("matchId", "matchNumber status venue startTime")
      .populate("createdBy", "name email role")
      .lean();
  }

  async findByMatch(matchId) {
    return await Commentary.find({ matchId })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name role")
      .lean();
  }

  async deleteById(id) {
    return await Commentary.findByIdAndDelete(id).lean();
  }
}

export default new CommentaryRepository();
