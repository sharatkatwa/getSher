import Match from "../model/match.model.js";

class MatchRepository {
  async create(matchData) {
    const match = new Match(matchData);
    return await match.save();
  }

  async findById(matchId, includeDeleted = false) {
    const query = { _id: matchId };
    if (!includeDeleted) {
      query.isDeleted = false;
    }

    return await Match.findOne(query)
      // .populate("seriesId", "name")
      .populate("team1 team2", "name logo")
      .populate("playingXI.team1.player playingXI.team2.player", "name role country imageUrl")
      .populate("winner", "name");
  }



  async findAll({ page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;

    return await Match.find({ isDeleted: false })
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate("seriesId", "name")
      .populate("team1 team2", "name logo")
      .populate("playingXI.team1.player playingXI.team2.player", "name role country imageUrl");
  }

  async findDuplicateMatch({ seriesId, team1, team2, startTime }) {
    return await Match.findOne({
      seriesId,
      isDeleted: false,
      startTime: new Date(startTime),
      $or: [
        { team1, team2 },
        { team1: team2, team2: team1 },
      ],
    });
  }

  async findByStatus(status, { page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;

    return await Match.find({ status, isDeleted: false })
      .sort({ startTime: 1 })
      .skip(skip)
      .limit(limit)
      .populate("team1 team2", "name logo")
      .populate("playingXI.team1.player playingXI.team2.player", "name role country imageUrl");
  }

  async findBySeries(seriesId) {
    return await Match.find({ seriesId, isDeleted: false })
      .sort({ startTime: 1 })
      .populate("team1 team2", "name logo")
      .populate("playingXI.team1.player playingXI.team2.player", "name role country imageUrl");
  }

async findByTeam(teamId) {
  return await Match.find({
    isDeleted: false,
    $or: [
      { team1: teamId },
      { team2: teamId },
    ],
  })
    .sort({ startTime: -1 })
    .populate("seriesId", "name")
    .populate("team1 team2", "name logo")
    .populate("playingXI.team1.player playingXI.team2.player", "name role country imageUrl");
}

  async update(matchId, updateData) {
    return await Match.findOneAndUpdate(
      { _id: matchId, isDeleted: false },
      { $set: updateData },
      { new: true, runValidators: true },
    );
  }

  async softDelete(matchId, userId) {
    return await Match.findOneAndUpdate(
      { _id: matchId, isDeleted: false },
      {
        $set: {
          isDeleted: true,
          updatedBy: userId,
        },
      },
      { new: true },
    );
  }



// TODO:
// Re-enable populate once Player model
// is registered and merged into main branch.

  // async updatePlayingXI(matchId, playingXI) {
  //   return await Match.findOneAndUpdate(
  //     { _id: matchId, isDeleted: false },
  //     { $set: { playingXI } },
  //     { new: true },
  //   ).populate("playingXI.team1.player playingXI.team2.player", "name role");
  // }

  async updatePlayingXI(matchId, playingXI) {
  return await Match.findOneAndUpdate(
    { _id: matchId, isDeleted: false },
    { $set: { playingXI } },
    { new: true },
  ).populate("playingXI.team1.player playingXI.team2.player", "name role country imageUrl");
}
}

export default new MatchRepository();
