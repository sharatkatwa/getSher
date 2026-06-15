import Icon from "../shared/Icon";
import MatchCard from "./MatchCard";

const matches = [
  {
    meta: "1st Test • Border-Gavaskar Trophy",
    status: "● Live",
    statusColor: "text-error",
    highlight: "Kohli 84* (112)",
    action: "Match Center",
    teams: [
      { code: "IND", score: "342/8", overs: "90.0 Overs" },
      { code: "AUS", score: "Yet to Bat", muted: true },
    ],
  },
  {
    meta: "2nd ODI • England Tour of SA",
    status: "Rain Delay",
    statusColor: "text-secondary",
    highlight: "Buttler 52 (38)",
    action: "Scorecard",
    teams: [
      { code: "ENG", score: "285/6", overs: "44.2 Overs" },
      { code: "RSA", score: "Yet to Bat", muted: true },
    ],
  },
  {
    meta: "T20I Series • Pakistan Tour",
    status: "Starts Soon",
    statusColor: "text-on-surface-variant",
    highlight: "Powerplay begins in 24m",
    action: "Preview",
    teams: [
      { code: "PAK", score: "Ready" },
      { code: "IND", score: "Ready", muted: true },
    ],
  },
];

const LiveMatches = () => {
  return (
    <section>
      <div className="mb-md flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <h2 className="text-headline-lg text-primary">Live Matches</h2>
          <span className="rounded-full bg-live px-sm py-xs text-label-caps text-on-secondary">
            Live Now
          </span>
        </div>
        <button className="hidden items-center gap-xs text-body-md font-bold text-primary sm:flex">
          View All
          <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-lg overflow-x-auto pb-sm">
        {matches.map((match) => (
          <MatchCard key={match.meta} match={match} />
        ))}
      </div>
    </section>
  );
};

export default LiveMatches;
