import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";

const teams = [
  { id: 1, name: "India", shortName: "IND", players: 18, color: "Blue", status: "Published" },
  { id: 2, name: "Australia", shortName: "AUS", players: 17, color: "Green", status: "Published" },
  { id: 3, name: "England", shortName: "ENG", players: 16, color: "Navy", status: "Draft" },
  { id: 4, name: "South Africa", shortName: "RSA", players: 15, color: "Green", status: "Published" },
];

const AdminTeams = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="primary">{teams.length} Teams</StatusPill>}
        description="Manage team identity, colors, logos, and squad composition for match operations."
        eyebrow="Squads"
        title="Manage Teams"
      />
      <AdminToolbar primaryAction="Create Team" searchPlaceholder="Search team or short name..." />
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
        rows={teams}
      />
    </div>
  );
};

export default AdminTeams;
