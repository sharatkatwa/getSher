import { useState } from "react";
import { useForm } from "react-hook-form";

import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { usePlayers } from "../../hooks/usePlayers";
import { useCreateTeam, useTeams } from "../../hooks/useTeams";

const AdminTeams = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { teams = [], isError, isLoading } = useTeams();
  const { data: players = [] } = usePlayers();
  const createTeamMutation = useCreateTeam();
  const rows = teams.map((team) => ({
    ...team,
    players: team.squadPlayers?.length || 0,
    color: team.primaryColor || "N/A",
    status: team.isDeleted ? "Deleted" : "Published",
  }));

  const handleCreateTeam = (data) => {
    const payload = {
      ...data,
      shortName: data.shortName.toUpperCase(),
      squadPlayers: data.squadPlayers?.length ? data.squadPlayers : undefined,
    };

    createTeamMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        setIsFormOpen(false);
      },
    });
  };

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="primary">{teams.length} Teams</StatusPill>}
        description="Manage team identity, colors, logos, and squad composition for match operations."
        eyebrow="Squads"
        title="Manage Teams"
      />
      <AdminToolbar
        onPrimaryAction={() => setIsFormOpen((isOpen) => !isOpen)}
        primaryAction={isFormOpen ? "Close Form" : "Create Team"}
        searchPlaceholder="Search team or short name..."
      />

      {isFormOpen && (
        <form className="grid gap-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card md:grid-cols-2 xl:grid-cols-4" onSubmit={handleSubmit(handleCreateTeam)}>
          <input {...register("name", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Team name" />
          <input {...register("shortName", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm uppercase outline-none focus:border-primary" placeholder="Short name" />
          <input {...register("logo", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Logo URL" />
          <input {...register("primaryColor")} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Primary color #0B3D91" />
          <select {...register("squadPlayers")} className="min-h-32 rounded-md border border-outline-variant bg-surface px-md py-sm text-body-sm outline-none focus:border-primary md:col-span-2 xl:col-span-4" multiple>
            {players.map((player) => (
              <option key={player._id} value={player._id}>
                {player.name} - {player.country}
              </option>
            ))}
          </select>
          {createTeamMutation.isError && (
            <StatusPill tone="live">Failed to create team</StatusPill>
          )}
          <div className="flex justify-end gap-sm md:col-span-2 xl:col-span-4">
            <AdminActionButton variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</AdminActionButton>
            <AdminActionButton type="submit">{createTeamMutation.isPending ? "Saving..." : "Save Team"}</AdminActionButton>
          </div>
        </form>
      )}

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
