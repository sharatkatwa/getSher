import Icon from "../../components/shared/Icon";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import TeamBadge from "../../components/home/TeamBadge";
import { useMatches } from "../../hooks/useMatches";

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
  ABANDONED: "neutral",
};

const getTeamCode = (team) => team?.shortName || team?.name?.slice(0, 3).toUpperCase() || "?";

const Matches = () => {
  const { data, isError, isLoading } = useMatches();
  const matches = data?.matches || data || [];
  const liveCount = matches.filter((match) => match.status === "LIVE").length;
  const upcomingCount = matches.filter((match) => match.status === "UPCOMING").length;

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={
          <div className="flex gap-xs">
            <StatusPill tone="live">Live {liveCount}</StatusPill>
            <StatusPill tone="upcoming">Upcoming {upcomingCount}</StatusPill>
          </div>
        }
        description="A match center listing live, upcoming, and scheduled fixtures with key context."
        eyebrow="Fixtures"
        title="Matches"
      />

      {isLoading && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md text-on-surface-variant">
          Loading matches...
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-error bg-error-container p-md text-body-md font-bold text-on-error-container">
          Failed to load matches.
        </div>
      )}

      {!isLoading && !isError && matches.length === 0 && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md text-on-surface-variant">
          No matches found.
        </div>
      )}

      <div className="grid gap-md">
        {matches.map((match) => (
          <article
            className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card transition hover:border-primary"
            key={match._id}
          >
            <div className="grid gap-md lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-start gap-md">
                <div className="flex -space-x-sm">
                  {[match.team1, match.team2].map((team) => (
                    <TeamBadge code={getTeamCode(team)} key={team?._id || getTeamCode(team)} />
                  ))}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-sm">
                    <h2 className="text-title-md font-extrabold text-on-surface">
                      {match.team1?.name} vs {match.team2?.name}
                    </h2>
                    <StatusPill tone={toneByStatus[match.status]}>{match.status}</StatusPill>
                  </div>
                  <p className="mt-xs text-body-sm font-semibold text-primary">
                    {match.seriesId?.name || match.matchNumber}
                  </p>
                  <p className="mt-xs flex items-center gap-xs text-body-sm text-on-surface-variant">
                    <Icon name="calendar" className="h-4 w-4 text-primary" />
                    {match.startTime ? new Date(match.startTime).toLocaleString() : "Time TBA"}
                  </p>
                  <p className="mt-xs text-body-sm text-on-surface-variant">{match.venue}</p>
                </div>
              </div>

              <div className="rounded-md bg-surface-container p-md lg:w-72">
                <p className="text-label-data text-on-surface-variant">Current State</p>
                <p className="mt-xs text-body-md font-extrabold text-primary">
                  {match.result || match.status}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Matches;
