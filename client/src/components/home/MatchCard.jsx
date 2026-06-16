import Icon from "../shared/Icon";
import TeamBadge from "./TeamBadge";

const MatchCard = ({ match }) => {
  return (
    <article className="min-w-[340px] overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
      <div className="flex items-center justify-between bg-surface-container px-md py-xs">
        <p className="truncate text-label-caps text-on-surface-variant">{match.meta}</p>
        <p className={`text-label-data font-bold ${match.statusColor}`}>{match.status}</p>
      </div>

      <div className="space-y-md p-md">
        {match.teams.map((team) => (
          <div className="flex items-center gap-md" key={team.code}>
            <TeamBadge code={team.code} muted={team.muted} />
            <p className={`w-16 text-title-md font-bold ${team.muted ? "text-on-surface-variant" : "text-on-surface"}`}>
              {team.code}
            </p>
            <div className="ml-auto text-right">
              <p className={`text-headline-lg font-extrabold ${team.muted ? "text-on-surface-variant" : "text-primary"}`}>
                {team.score}
              </p>
              {team.overs && <p className="text-label-data text-on-surface-variant">{team.overs}</p>}
            </div>
          </div>
        ))}

        <div className="border-t border-outline-variant pt-md">
          <div className="flex items-center gap-sm">
            <p className="min-w-0 flex-1 truncate text-body-md text-on-surface">
              {match.highlight}
            </p>
            <button className="grid size-10 place-items-center rounded-md bg-surface-container text-primary">
              <Icon name="chart" className="h-4 w-4" />
            </button>
            <button className="rounded-md bg-primary px-md py-sm text-body-sm font-bold text-on-primary">
              {match.action}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MatchCard;
