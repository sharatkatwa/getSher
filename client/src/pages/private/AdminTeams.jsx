import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useTeams } from "../../hooks/useTeams";

const AdminTeams = () => {
  const { teams = [], isError, isLoading } = useTeams();
  const rows = teams.map((team) => ({
    ...team,
    players: team.squadPlayers?.length || 0,
    color: team.primaryColor || "N/A",
    status: team.isDeleted ? "Deleted" : "Published",
  }));

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="primary">{teams.length} Teams</StatusPill>}
        description="Manage team identity, colors, logos, and squad composition for match operations."
        eyebrow="Squads"
        title="Manage Teams"
      />
      <AdminToolbar primaryAction="Create Team" searchPlaceholder="Search team or short name..." />

      {isLoading && <StatusPill tone="neutral">Loading teams...</StatusPill>}
      {isError && <StatusPill tone="live">Failed to load teams</StatusPill>}

      <AdminTable
        columns={[
          { key: "name", label: "Team" },
          { key: "shortName", label: "Short Name" },
          { key: "players", label: "Squad Players" },
          { key: "color", label: "Primary Color" },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <StatusPill tone={row.status === "Published" ? "completed" : "neutral"}>
                {row.status}
              </StatusPill>
            ),
          },
        ]}
        renderActions={() => (
          <>
            <AdminActionButton variant="secondary">Squad</AdminActionButton>
            <AdminActionButton variant="secondary">Edit</AdminActionButton>
          </>
        )}
        rows={rows}
      />
    </div>
  );
};

export default AdminTeams;
