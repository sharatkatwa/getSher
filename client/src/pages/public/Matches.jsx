import Icon from "../../components/shared/Icon";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import TeamBadge from "../../components/home/TeamBadge";

// Static preview data; replace with useMatches() once API integration is enabled.
const matches = [
  {
    title: "India vs Australia",
    series: "Border-Gavaskar Trophy",
    venue: "Melbourne Cricket Ground",
    time: "Today • 16:30",
    status: "LIVE",
    teams: ["IND", "AUS"],
    result: "IND 342/8 after 90.0 overs",
  },
  {
    title: "England vs South Africa",
    series: "England Tour of SA",
    venue: "Newlands, Cape Town",
    time: "Today • 18:00",
    status: "LIVE",
    teams: ["ENG", "RSA"],
    result: "Rain delay",
  },
  {
    title: "West Indies vs Bangladesh",
    series: "ODI Tri-Series",
    venue: "Kensington Oval",
    time: "Tomorrow • 14:00",
    status: "UPCOMING",
    teams: ["WI", "BAN"],
    result: "Toss pending",
  },
  {
    title: "Sri Lanka vs Afghanistan",
    series: "T20I Series",
    venue: "R. Premadasa Stadium",
    time: "Nov 22 • 09:30",
    status: "UPCOMING",
    teams: ["SL", "AFG"],
    result: "Squads announced",
  },
];

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
};

const Matches = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        description="A static match center listing live, upcoming, and scheduled fixtures with key context."
        eyebrow="Fixtures"
        title="Matches"
        action={
          <div className="flex gap-xs">
            <StatusPill tone="live">Live 2</StatusPill>
            <StatusPill tone="upcoming">Upcoming 2</StatusPill>
          </div>
        }
      />

      <div className="grid gap-md">
        {matches.map((match) => (
          <article
            className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card transition hover:border-primary"
            key={match.title}
          >
            <div className="grid gap-md lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-start gap-md">
                <div className="flex -space-x-sm">
                  {match.teams.map((team) => (
                    <TeamBadge code={team} key={team} />
                  ))}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-sm">
                    <h2 className="text-title-md font-extrabold text-on-surface">{match.title}</h2>
                    <StatusPill tone={toneByStatus[match.status]}>{match.status}</StatusPill>
                  </div>
                  <p className="mt-xs text-body-sm font-semibold text-primary">{match.series}</p>
                  <p className="mt-xs flex items-center gap-xs text-body-sm text-on-surface-variant">
                    <Icon name="calendar" className="h-4 w-4 text-primary" />
                    {match.time}
                  </p>
                  <p className="mt-xs text-body-sm text-on-surface-variant">{match.venue}</p>
                </div>
              </div>

              <div className="rounded-md bg-surface-container p-md lg:w-72">
                <p className="text-label-data text-on-surface-variant">Current State</p>
                <p className="mt-xs text-body-md font-extrabold text-primary">{match.result}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Matches;
