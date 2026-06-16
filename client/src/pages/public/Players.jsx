import Icon from "../../components/shared/Icon";
import PageHeader from "../../components/shared/PageHeader";
import StatBadge from "../../components/shared/StatBadge";
import StatusPill from "../../components/shared/StatusPill";
import { usePlayers } from "../../hooks/usePlayers";

const Players = () => {
  const { data: players = [], isError, isLoading } = usePlayers();

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="primary">{players.length} Active Players</StatusPill>}
        description="Browse player profiles, roles, countries, and cricketing styles across international squads."
        eyebrow="Roster"
        title="Players"
      />

      {isLoading && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md text-on-surface-variant">
          Loading players...
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-error bg-error-container p-md text-body-md font-bold text-on-error-container">
          Failed to load players.
        </div>
      )}

      {!isLoading && !isError && players.length === 0 && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md text-on-surface-variant">
          No players found.
        </div>
      )}

      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-4">
        {players.map((player) => (
          <article
            className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card transition hover:border-primary"
            key={player._id}
          >
            <div className="flex items-start justify-between gap-md">
              <div className="grid size-14 place-items-center rounded-lg bg-primary text-title-md font-extrabold text-on-primary">
                {player.country?.slice(0, 3).toUpperCase() || "PLY"}
              </div>
              <StatusPill tone="neutral">{player.role}</StatusPill>
            </div>

            <h2 className="mt-md text-title-md font-extrabold text-on-surface">{player.name}</h2>
            <p className="text-body-sm text-on-surface-variant">{player.country}</p>

            <div className="mt-md grid gap-sm">
              <div className="flex items-center gap-sm text-body-sm text-on-surface-variant">
                <Icon name="bat" className="h-4 w-4 text-primary" />
                {player.battingStyle}
              </div>
              <div className="flex items-center gap-sm text-body-sm text-on-surface-variant">
                <Icon name="activity" className="h-4 w-4 text-primary" />
                {player.bowlingStyle || "N/A"}
              </div>
            </div>

            <div className="mt-md grid grid-cols-2 gap-sm">
              <StatBadge label="Role" value={player.role} />
              <StatBadge label="Country" value={player.country} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Players;
