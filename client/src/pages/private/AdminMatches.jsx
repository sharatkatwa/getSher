import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useMatches } from "../../hooks/useMatches";

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
  ABANDONED: "neutral",
};

const AdminMatches = () => {
  const { data, isError, isLoading } = useMatches();
  const matches = data?.matches || data || [];
  const upcomingCount = matches.filter((match) => match.status === "UPCOMING").length;
  const rows = matches.map((match) => ({
    ...match,
    match: `${match.team1?.name || "Team 1"} vs ${match.team2?.name || "Team 2"}`,
    series: match.seriesId?.name || match.matchNumber || "N/A",
    startTime: match.startTime ? new Date(match.startTime).toLocaleString() : "TBA",
  }));

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="upcoming">{upcomingCount} Upcoming</StatusPill>}
        description="Schedule fixtures, update venues, manage status, and prepare match operations."
        eyebrow="Fixtures"
        title="Manage Matches"
      />
      <AdminToolbar primaryAction="Schedule Match" searchPlaceholder="Search match, venue, or series..." />

      {isLoading && <StatusPill tone="neutral">Loading matches...</StatusPill>}
      {isError && <StatusPill tone="live">Failed to load matches</StatusPill>}

      <AdminTable
        columns={[
          { key: "match", label: "Match" },
          { key: "series", label: "Series" },
          { key: "venue", label: "Venue" },
          { key: "startTime", label: "Start Time" },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <StatusPill tone={toneByStatus[row.status] || "neutral"}>{row.status}</StatusPill>
            ),
          },
        ]}
        renderActions={() => (
          <>
            <AdminActionButton variant="secondary">Lineups</AdminActionButton>
            <AdminActionButton variant="secondary">Edit</AdminActionButton>
          </>
        )}
        rows={rows}
      />
    </div>
  );
};

export default AdminMatches;
