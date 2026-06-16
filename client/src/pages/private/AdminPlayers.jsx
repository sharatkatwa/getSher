import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { usePlayers } from "../../hooks/usePlayers";

const AdminPlayers = () => {
  const { data: players = [], isError, isLoading } = usePlayers();
  const rows = players.map((player) => ({
    ...player,
    status: player.isDeleted ? "Deleted" : "Active",
    style: player.battingStyle || player.bowlingStyle || "N/A",
  }));

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="primary">{players.length} Profiles</StatusPill>}
        description="Create, review, and maintain player profiles used across squads and match lineups."
        eyebrow="People"
        title="Manage Players"
      />
      <AdminToolbar primaryAction="Add Player" searchPlaceholder="Search player name, role, country..." />

      {isLoading && <StatusPill tone="neutral">Loading players...</StatusPill>}
      {isError && <StatusPill tone="live">Failed to load players</StatusPill>}

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
        rows={rows}
      />
    </div>
  );
};

export default AdminPlayers;
