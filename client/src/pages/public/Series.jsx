import Icon from "../../components/shared/Icon";
import PageHeader from "../../components/shared/PageHeader";
import StatBadge from "../../components/shared/StatBadge";
import StatusPill from "../../components/shared/StatusPill";
import { useSeries } from "../../hooks/useSeries";

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
};

const Series = () => {
  const { data: series = [], isError, isLoading } = useSeries();

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="primary">{series.length} Series</StatusPill>}
        description="Track major tours, tournament seasons, and status in a compact series view."
        eyebrow="Calendar"
        title="Series"
      />

      {isLoading && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md text-on-surface-variant">
          Loading series...
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-error bg-error-container p-md text-body-md font-bold text-on-error-container">
          Failed to load series.
        </div>
      )}

      {!isLoading && !isError && series.length === 0 && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md text-on-surface-variant">
          No series found.
        </div>
      )}

      <div className="grid gap-md">
        {series.map((item) => (
          <article
            className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card transition hover:border-primary"
            key={item._id}
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
                <StatBadge label="Season" value={item.season} />
                <StatBadge label="Status" value={item.status} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Series;
