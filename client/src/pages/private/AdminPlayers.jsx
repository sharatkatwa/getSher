import { useState } from "react";
import { useForm } from "react-hook-form";

import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useCreatePlayer, usePlayers } from "../../hooks/usePlayers";

const AdminPlayers = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { role: "BATSMAN" },
  });
  const { data: players = [], isError, isLoading } = usePlayers();
  const createPlayerMutation = useCreatePlayer();
  const rows = players.map((player) => ({
    ...player,
    status: player.isDeleted ? "Deleted" : "Active",
    style: player.battingStyle || player.bowlingStyle || "N/A",
  }));

  const handleCreatePlayer = (data) => {
    createPlayerMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setIsFormOpen(false);
      },
    });
  };

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="primary">{players.length} Profiles</StatusPill>}
        description="Create, review, and maintain player profiles used across squads and match lineups."
        eyebrow="People"
        title="Manage Players"
      />
      <AdminToolbar
        onPrimaryAction={() => setIsFormOpen((isOpen) => !isOpen)}
        primaryAction={isFormOpen ? "Close Form" : "Add Player"}
        searchPlaceholder="Search player name, role, country..."
      />

      {isFormOpen && (
        <form className="grid gap-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card md:grid-cols-2 xl:grid-cols-3" onSubmit={handleSubmit(handleCreatePlayer)}>
          <input {...register("name", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Player name" />
          <select {...register("role", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary">
            <option>BATSMAN</option>
            <option>BOWLER</option>
            <option>ALL_ROUNDER</option>
            <option>WICKET_KEEPER</option>
          </select>
          <input {...register("country", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Country" />
          <input {...register("imageUrl", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Image URL" />
          <input {...register("battingStyle", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Batting style" />
          <input {...register("bowlingStyle")} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Bowling style" />
          {createPlayerMutation.isError && (
            <StatusPill tone="live">Failed to create player</StatusPill>
          )}
          <div className="flex justify-end gap-sm md:col-span-2 xl:col-span-3">
            <AdminActionButton variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</AdminActionButton>
            <AdminActionButton type="submit">{createPlayerMutation.isPending ? "Saving..." : "Save Player"}</AdminActionButton>
          </div>
        </form>
      )}

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
