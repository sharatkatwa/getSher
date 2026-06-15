import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";

// Static table rows; later this page should use series queries and mutations.
const series = [
  { id: 1, name: "Border-Gavaskar Trophy", season: "2026", status: "LIVE", matches: 5 },
  { id: 2, name: "England Tour of SA", season: "2026", status: "LIVE", matches: 3 },
  { id: 3, name: "Asia T20 Challenge", season: "2026", status: "UPCOMING", matches: 12 },
  { id: 4, name: "World Test Championship", season: "2025-27", status: "LIVE", matches: 42 },
];

const AdminSeries = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="live">2 Live Series</StatusPill>}
        description="Create tournament seasons, track status, and prepare series metadata for fixtures."
        eyebrow="Calendar"
        title="Manage Series"
      />
      <AdminToolbar primaryAction="Create Series" searchPlaceholder="Search series name or season..." />
      <AdminTable
        columns={[
          { key: "name", label: "Series" },
          { key: "season", label: "Season" },
          { key: "matches", label: "Matches" },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <StatusPill tone={row.status === "LIVE" ? "live" : "upcoming"}>
                {row.status}
              </StatusPill>
            ),
          },
        ]}
        renderActions={() => (
          <>
            <AdminActionButton variant="secondary">Fixtures</AdminActionButton>
            <AdminActionButton variant="secondary">Edit</AdminActionButton>
          </>
        )}
        rows={series}
      />
    </div>
  );
};

export default AdminSeries;
