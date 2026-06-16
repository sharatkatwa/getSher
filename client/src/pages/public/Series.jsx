import Icon from "../../components/shared/Icon";
import PageHeader from "../../components/shared/PageHeader";
import StatBadge from "../../components/shared/StatBadge";
import StatusPill from "../../components/shared/StatusPill";

// Static preview data; replace with useSeries() once API integration is enabled.
const series = [
  {
    name: "Border-Gavaskar Trophy",
    season: "2026",
    shortName: "BGT",
    status: "LIVE",
    matches: 5,
    completed: 2,
  },
  {
    name: "England Tour of South Africa",
    season: "2026",
    shortName: "ENG v RSA",
    status: "LIVE",
    matches: 3,
    completed: 1,
  },
  {
    name: "Asia T20 Challenge",
    season: "2026",
    shortName: "ATC",
    status: "UPCOMING",
    matches: 12,
    completed: 0,
  },
  {
    name: "World Test Championship",
    season: "2025-27",
    shortName: "WTC",
    status: "LIVE",
    matches: 42,
    completed: 18,
  },
];

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
};

const Series = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        description="Track major tours, tournament seasons, and match progress in a compact series view."
        eyebrow="Calendar"
        title="Series"
        action={<StatusPill tone="primary">{series.length} Series</StatusPill>}
      />

      <div className="grid gap-md">
        {series.map((item) => (
          <article
            className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card transition hover:border-primary"
            key={item.name}
          >
            <div className="flex flex-col gap-md sm:flex-row sm:items-center">
              <div className="grid size-14 place-items-center rounded-lg bg-primary text-label-data font-extrabold text-on-primary">
                {item.shortName}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-sm">
                  <h2 className="text-title-md font-extrabold text-on-surface">{item.name}</h2>
                  <StatusPill tone={toneByStatus[item.status]}>{item.status}</StatusPill>
                </div>
                <p className="mt-xs flex items-center gap-xs text-body-sm text-on-surface-variant">
                  <Icon name="calendar" className="h-4 w-4 text-primary" />
                  Season {item.season}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-sm sm:w-64">
                <StatBadge label="Matches" value={item.matches} />
                <StatBadge label="Done" value={item.completed} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Series;
