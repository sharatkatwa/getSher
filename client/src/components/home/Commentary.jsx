import { useCommentaryByMatch } from "../../hooks/useCommentary";

const getId = (value) => value?._id || value || "";

const getTeamCode = (team) =>
  team?.shortName || team?.name?.slice(0, 3).toUpperCase() || "TBA";

const getCommentaryTone = (type) => {
  if (type === "WICKET") return "bg-error-container/40 text-error";
  if (type === "FOUR" || type === "SIX") return "bg-secondary-container/20 text-primary";
  return "bg-surface-container-lowest text-on-surface";
};

const getCommentaryLabel = (type) => {
  if (type === "FOUR") return "4 Runs";
  if (type === "SIX") return "6 Runs";
  if (type === "WICKET") return "Wicket";
  return type || "Normal";
};

const formatTime = (dateValue) => {
  if (!dateValue) return "";

  return new Date(dateValue).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Commentary = ({ match }) => {
  const matchId = getId(match);
  const { data = [], isError, isLoading } = useCommentaryByMatch(matchId);

  const commentary = [...data]
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
    .slice(0, 6);

  return (
    <section>
      <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
        <h2 className="border-l-4 border-secondary pl-sm text-title-md font-bold text-primary">
          Live Commentary
        </h2>
        <div className="flex gap-xs">
          <span className="rounded-sm bg-surface-container px-sm py-xs text-label-data text-primary">
            {match ? `${getTeamCode(match.team1)} vs ${getTeamCode(match.team2)}` : "No live match"}
          </span>
          {match?.matchNumber && (
            <span className="rounded-sm bg-surface-container px-sm py-xs text-label-data text-on-surface-variant">
              {match.matchNumber}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
        {isLoading && (
          <p className="p-md text-body-sm text-on-surface-variant">
            Loading live commentary...
          </p>
        )}

        {isError && (
          <p className="p-md text-body-sm font-bold text-error">
            Failed to load live commentary.
          </p>
        )}

        {!isLoading && !isError && commentary.length === 0 && (
          <p className="p-md text-body-sm text-on-surface-variant">
            No commentary has been published for this match yet.
          </p>
        )}

        {commentary.map((ball) => (
          <article
            className={`border-b border-outline-variant p-md last:border-b-0 ${getCommentaryTone(ball.type)}`}
            key={getId(ball)}
          >
            <div className="grid gap-sm sm:grid-cols-[3rem_1fr_3rem]">
              <div>
                <p className="text-title-md font-extrabold">
                  {ball.over}.{ball.ball}
                </p>
                <p className="text-[10px] font-bold uppercase text-on-surface-variant">
                  {getCommentaryLabel(ball.type)}
                </p>
              </div>
              <div>
                <h3 className="text-body-md font-extrabold">{ball.type}</h3>
                <p className="mt-xs text-body-md text-on-surface-variant">
                  {ball.text}
                </p>
              </div>
              <p className="text-right text-label-data text-on-surface-variant">
                {formatTime(ball.createdAt)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Commentary;
