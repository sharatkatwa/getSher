import Icon from "../shared/Icon";

const getTeamCode = (team) =>
  team?.shortName || team?.name?.slice(0, 3).toUpperCase() || "?";

const UpcomingCard = ({ matches = [] }) => (
  <section className="rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
    <div className="flex items-center justify-between bg-surface-container px-md py-sm">
      <h2 className="text-body-md font-extrabold text-primary">Upcoming</h2>
      <Icon name="calendar" className="h-4 w-4 text-on-surface-variant" />
    </div>
    <div className="divide-y divide-outline-variant p-md">
      {matches.map((match) => (
        <div className="py-sm first:pt-0 last:pb-0" key={match._id}>
          <p className="text-label-data text-on-surface-variant">
            {match.startTime ? new Date(match.startTime).toLocaleString() : "TBA"}
          </p>
          <div className="mt-xs flex items-center justify-between gap-md">
            <p className="text-body-md font-extrabold text-on-surface">
              {getTeamCode(match.team1)} vs {getTeamCode(match.team2)}
            </p>
            <span className="rounded-sm bg-surface-container px-sm py-xs text-label-data text-on-surface-variant">
              {match.matchNumber || "Match"}
            </span>
          </div>
        </div>
      ))}

      {matches.length === 0 && (
        <p className="py-sm text-body-sm text-on-surface-variant">No upcoming matches.</p>
      )}
    </div>
  </section>
);

const RecentCard = ({ matches = [] }) => (
  <section className="rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
    <div className="flex items-center justify-between px-md py-sm">
      <h2 className="text-body-md font-extrabold text-primary">Recent</h2>
      <button className="text-label-data font-bold text-primary">All</button>
    </div>
    <div className="divide-y divide-outline-variant p-md">
      {matches.map((match) => (
        <div className="py-sm first:pt-0 last:pb-0" key={match._id}>
          <p className="text-body-md font-extrabold text-on-surface">
            {getTeamCode(match.team1)} vs {getTeamCode(match.team2)}
          </p>
          <p className="text-label-data text-on-surface-variant">
            {match.result || match.status}
          </p>
        </div>
      ))}

      {matches.length === 0 && (
        <p className="py-sm text-body-sm text-on-surface-variant">No recent matches.</p>
      )}
    </div>
  </section>
);

const FantasyCard = () => (
  <section className="relative overflow-hidden rounded-lg bg-primary p-lg text-center text-on-primary shadow-floating">
    <div className="absolute -right-12 -top-12 size-32 rounded-full bg-secondary/30" />
    <div className="absolute -bottom-16 left-4 size-36 rounded-full bg-tertiary/20" />
    <Icon name="trophy" className="relative mx-auto h-9 w-9 text-secondary" />
    <h2 className="relative mt-sm text-title-md font-extrabold">getSher Fantasy</h2>
    <p className="relative mx-auto mt-xs max-w-44 text-body-sm text-on-primary/80">
      Join the league and win big!
    </p>
    <button className="relative mt-md rounded-full bg-live px-xl py-sm text-body-sm font-extrabold text-on-secondary">
      Play Now
    </button>
  </section>
);

const RightRail = ({ recentMatches = [], upcomingMatches = [] }) => {
  return (
    <aside className="grid gap-lg lg:w-64 lg:shrink-0">
      <UpcomingCard matches={upcomingMatches} />
      <RecentCard matches={recentMatches} />
      <FantasyCard />
    </aside>
  );
};

export default RightRail;
