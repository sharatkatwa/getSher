import { MATCH_STATUS } from "../../../constants/model.constant.js";
import matchRepository from "../../../repository/match.repository.js";
import scoreRepository from "../../../repository/score.repository.js";

const attachScores = (matches, scores) => {
  const scoresByMatch = scores.reduce((acc, score) => {
    const matchId = String(score.matchId);

    if (!acc[matchId]) {
      acc[matchId] = [];
    }

    acc[matchId].push(score);
    return acc;
  }, {});

  return matches.map((match) => ({
    ...match,
    scores: scoresByMatch[String(match._id)] || [],
  }));
};

export default class HomeService {
  async getHomeFeed() {
    const [liveMatches, upcomingMatches, recentMatches] = await Promise.all([
      matchRepository.findHomeMatchesByStatus(MATCH_STATUS.LIVE, {
        sort: { startTime: 1 },
        limit: 6,
      }),
      matchRepository.findHomeMatchesByStatus(MATCH_STATUS.UPCOMING, {
        sort: { startTime: 1 },
        limit: 6,
      }),
      matchRepository.findHomeMatchesByStatus(MATCH_STATUS.COMPLETED, {
        sort: { startTime: -1 },
        limit: 6,
      }),
    ]);

    const matchIds = [...liveMatches, ...upcomingMatches, ...recentMatches].map(
      (match) => match._id,
    );

    const scores = matchIds.length
      ? await scoreRepository.findByMatchIds(matchIds)
      : [];

    return {
      liveMatches: attachScores(liveMatches, scores),
      upcomingMatches: attachScores(upcomingMatches, scores),
      recentMatches: attachScores(recentMatches, scores),
    };
  }
}
