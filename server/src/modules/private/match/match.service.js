import matchRepository from "../../../repository/match.repository.js";
import SeriesRepository from "../../../repository/series.repository.js";
import TeamRepository from "../../../repository/team.repository.js";
import mongoose from "mongoose";
import { MATCH_STATUS } from "../../../constants/model.constant.js";
import {
  NotFoundError,
  ValidationError,
} from "../../../shared/error/custom.errors.js";

const seriesRepository = new SeriesRepository();
const teamRepository = new TeamRepository();

class MatchService {
  async ensureMatchExists(matchId) {
    if (!mongoose.Types.ObjectId.isValid(matchId)) {
      throw new ValidationError("Invalid Match ID");
    }

    const match = await matchRepository.findById(matchId);
    if (!match) {
      throw new NotFoundError("Match not found.");
    }

    return match;
  }

  /**
   * Create a new match
   */
  async createMatch(matchData) {
    const { seriesId, team1, team2, startTime } = matchData;

    if (
      !mongoose.Types.ObjectId.isValid(seriesId) ||
      !mongoose.Types.ObjectId.isValid(team1) ||
      !mongoose.Types.ObjectId.isValid(team2)
    ) {
      throw new ValidationError("Series and team IDs must be valid.");
    }

    // 1. Check Series Exists
    const seriesExists = await seriesRepository.exists(seriesId);
    if (!seriesExists) {
      throw new NotFoundError(
        "The specified tournament series does not exist.",
      );
    }

    // 2. Check Team1 Exists
    const team1Exists = await teamRepository.exists(team1);
    if (!team1Exists) {
      throw new NotFoundError("Team 1 does not exist.");
    }

    // 3. Check Team2 Exists
    const team2Exists = await teamRepository.exists(team2);
    if (!team2Exists) {
      throw new NotFoundError("Team 2 does not exist.");
    }

    // 4. Check Team1 != Team2
    if (String(team1) === String(team2)) {
      throw new ValidationError("A team cannot play against itself.");
    }

    // 5. Check Duplicate Match (Same series, teams, and start time)
    const duplicate = await matchRepository.findDuplicateMatch({
      seriesId,
      team1,
      team2,
      startTime,
    });

    if (duplicate) {
      throw new ValidationError(
        "A match between these teams is already scheduled for this series at the exact same time.",
      );
    }

    // 6. Force Status = UPCOMING & enforce future date validation
    if (new Date(startTime) <= new Date()) {
      throw new ValidationError("Match start time must be in the future.");
    }

    const safeMatchData = {
      ...matchData,
      status: "UPCOMING",
    };

    // 7. Create Match
    return await matchRepository.create(safeMatchData);
  }

  /**
   * Update general match parameters
   */
  async updateMatch(matchId, updateData) {
    const existingMatch = await this.ensureMatchExists(matchId);

    if (
      existingMatch.status === "LIVE" &&
      (updateData.team1 || updateData.team2 || updateData.seriesId)
    ) {
      throw new ValidationError(
        "Teams and series cannot be changed once the match is live.",
      );
    }

    if (
      updateData.team1 &&
      updateData.team2 &&
      String(updateData.team1) === String(updateData.team2)
    ) {
      throw new ValidationError("A team cannot play against itself.");
    }

    return await matchRepository.update(matchId, updateData);
  }

  /**
   * Lock in or update the Playing XI squads
   */

  async updatePlayingXI(matchId, playingXIData) {
    const match = await this.ensureMatchExists(matchId);

    if (match.status !== "UPCOMING") {
      throw new ValidationError(
        "Playing XI can only be updated before the match starts.",
      );
    }

    const validateXI = (players) => {
      if (!players) return;

      if (players.length !== 11) {
        throw new ValidationError(
          "Playing XI must contain exactly 11 players.",
        );
      }

      const uniquePlayers = new Set(
        players.map((player) => String(player.player)),
      );

      if (uniquePlayers.size !== players.length) {
        throw new ValidationError(
          "Duplicate players are not allowed in Playing XI.",
        );
      }

      const captains = players.filter((player) => player.isCaptain);

      if (captains.length !== 1) {
        throw new ValidationError("Exactly one captain is required.");
      }

      const wicketKeepers = players.filter((player) => player.isWicketKeeper);

      if (wicketKeepers.length !== 1) {
        throw new ValidationError("Exactly one wicketkeeper is required.");
      }
    };

    validateXI(playingXIData.team1);
    validateXI(playingXIData.team2);

    const updatedMatch = await matchRepository.updatePlayingXI(
      matchId,
      playingXIData,
    );

    if (!updatedMatch) {
      throw new NotFoundError("Failed to update Playing XI.");
    }

    return updatedMatch;
  }

  /**
     if  match is canceled
   */
async cancelMatch(matchId) {
  await this.ensureMatchExists(matchId);

  return await matchRepository.update(matchId, {
    status: MATCH_STATUS.CANCELLED,
  });
}
  /**
   * Safely soft-delete a match entry
   */
  async deleteMatch(matchId, userId) {
    const match = await this.ensureMatchExists(matchId);

    if (match.status === "LIVE") {
      throw new ValidationError("Live matches cannot be deleted.");
    }

    const deletedMatch = await matchRepository.softDelete(matchId, userId);
    if (!deletedMatch) {
      throw new NotFoundError("Match could not be deleted.");
    }

    return { success: true, message: "Match successfully deleted." };
  }
}

export default new MatchService();
