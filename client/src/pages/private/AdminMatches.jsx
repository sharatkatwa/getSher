import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";

// Static table rows; later this page should use match queries and mutations.
const matches = [
  { id: 1, match: "India vs Australia", series: "BGT", venue: "MCG", startTime: "Today 16:30", status: "LIVE" },
  { id: 2, match: "England vs South Africa", series: "ENG Tour", venue: "Cape Town", startTime: "Today 18:00", status: "LIVE" },
  { id: 3, match: "WI vs Bangladesh", series: "ODI Tri-Series", venue: "Barbados", startTime: "Tomorrow 14:00", status: "UPCOMING" },
  { id: 4, match: "SL vs Afghanistan", series: "T20I Series", venue: "Colombo", startTime: "Nov 22 09:30", status: "UPCOMING" },
];

const AdminMatches = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="upcoming">2 Upcoming</StatusPill>}
        description="Schedule fixtures, update venues, manage status, and prepare match operations."
        eyebrow="Fixtures"
        title="Manage Matches"
      />
      <AdminToolbar primaryAction="Schedule Match" searchPlaceholder="Search match, venue, or series..." />
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
              <StatusPill tone={row.status === "LIVE" ? "live" : "upcoming"}>
                {row.status}
              </StatusPill>
            ),
          },
        ]}
        renderActions={() => (
          <>
            <AdminActionButton variant="secondary">Lineups</AdminActionButton>
            <AdminActionButton variant="secondary">Edit</AdminActionButton>
          </>
        )}
        rows={matches}
      />
    </div>
  );
};

export default AdminMatches;
