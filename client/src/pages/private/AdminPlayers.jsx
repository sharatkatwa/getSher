import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";

// Static table rows; later this page should use a players query and mutations.
const players = [
  { id: 1, name: "Virat Kohli", role: "BATSMAN", country: "India", style: "Right hand bat", status: "Active" },
  { id: 2, name: "Pat Cummins", role: "BOWLER", country: "Australia", style: "Right arm fast", status: "Active" },
  { id: 3, name: "Jos Buttler", role: "WICKET_KEEPER", country: "England", style: "Right hand bat", status: "Review" },
  { id: 4, name: "Kagiso Rabada", role: "BOWLER", country: "South Africa", style: "Right arm fast", status: "Active" },
];

const AdminPlayers = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="primary">{players.length} Profiles</StatusPill>}
        description="Create, review, and maintain player profiles used across squads and match lineups."
        eyebrow="People"
        title="Manage Players"
      />
      <AdminToolbar primaryAction="Add Player" searchPlaceholder="Search player name, role, country..." />
      <AdminTable
        columns={[
          { key: "name", label: "Player" },
          { key: "role", label: "Role" },
          { key: "country", label: "Country" },
          { key: "style", label: "Primary Style" },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <StatusPill tone={row.status === "Active" ? "completed" : "upcoming"}>
                {row.status}
              </StatusPill>
            ),
          },
        ]}
        renderActions={() => (
          <>
            <AdminActionButton variant="secondary">Edit</AdminActionButton>
            <AdminActionButton variant="danger">Delete</AdminActionButton>
          </>
        )}
        rows={players}
      />
    </div>
  );
};

export default AdminPlayers;
