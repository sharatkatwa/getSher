import Icon from "../shared/Icon";
import MatchCard from "./MatchCard";

const getTeamCode = (team) =>
  team?.shortName || team?.name?.slice(0, 3).toUpperCase() || "?";

const getScoreText = (score) => {
  if (!score) return "Yet to Bat";
  return `${score.score}/${score.wickets}`;
};

const getTeamScore = (match, team) =>
  match.scores?.find(
    (score) => String(score.battingTeam?._id || score.battingTeam) === String(team?._id),
  );

const mapMatchCard = (match) => {
  const team1Score = getTeamScore(match, match.team1);
  const team2Score = getTeamScore(match, match.team2);

  return {
    id: match._id,
    meta: `${match.matchNumber || "Match"} - ${
      match.seriesId?.shortName || match.seriesId?.name || "Series"
    }`,
    status: match.status === "LIVE" ? "Live" : match.status,
    statusColor: match.status === "LIVE" ? "text-error" : "text-on-surface-variant",
    highlight: match.venue || "Match center",
    action: "Match Center",
    teams: [
      {
        code: getTeamCode(match.team1),
        score: getScoreText(team1Score),
        overs: team1Score?.overs ? `${team1Score.overs} Overs` : undefined,
      },
      {
        code: getTeamCode(match.team2),
        score: getScoreText(team2Score),
        overs: team2Score?.overs ? `${team2Score.overs} Overs` : undefined,
        muted: !team2Score,
      },
    ],
  };
};

const LiveMatches = ({ matches = [] }) => {
  const cards = matches.map(mapMatchCard);

  return (
    <section>
      <div className="mb-md flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <h2 className="text-headline-lg text-primary">Live Matches</h2>
          <span className="rounded-full bg-live px-sm py-xs text-label-caps text-on-secondary">
            {cards.length} Live
          </span>
        </div>
        <button className="hidden items-center gap-xs text-body-md font-bold text-primary sm:flex">
          View All
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-lg overflow-x-auto pb-sm">
        {cards.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}

        {cards.length === 0 && (
          <div className="min-w-[340px] rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md text-on-surface-variant shadow-card">
            No live matches right now.
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveMatches;
