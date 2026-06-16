import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useSeries } from "../../hooks/useSeries";

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
};

const AdminSeries = () => {
  const { data: series = [], isError, isLoading } = useSeries();
  const liveCount = series.filter((item) => item.status === "LIVE").length;
  const rows = series.map((item) => ({
    ...item,
    matches: item.matches?.length || 0,
  }));

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="live">{liveCount} Live Series</StatusPill>}
        description="Create tournament seasons, track status, and prepare series metadata for fixtures."
        eyebrow="Calendar"
        title="Manage Series"
      />
      <AdminToolbar primaryAction="Create Series" searchPlaceholder="Search series name or season..." />

      {isLoading && <StatusPill tone="neutral">Loading series...</StatusPill>}
      {isError && <StatusPill tone="live">Failed to load series</StatusPill>}

      <AdminTable
        columns={[
          { key: "name", label: "Series" },
          { key: "season", label: "Season" },
          { key: "matches", label: "Matches" },
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
            <AdminActionButton variant="secondary">Fixtures</AdminActionButton>
            <AdminActionButton variant="secondary">Edit</AdminActionButton>
          </>
        )}
        rows={rows}
      />
    </div>
  );
};

export default AdminSeries;
