import { useState } from "react";
import { useForm } from "react-hook-form";

import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useCreatePlayer, usePlayers, useUpdatePlayer } from "../../hooks/usePlayers";

const AdminPlayers = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { role: "BATSMAN" },
  });
  const { data: players = [], isError, isLoading } = usePlayers();
  const createPlayerMutation = useCreatePlayer();
  const updatePlayerMutation = useUpdatePlayer();
  const rows = players.map((player) => ({
    ...player,
    status: player.isDeleted ? "Deleted" : "Active",
    style: player.battingStyle || player.bowlingStyle || "N/A",
  }));

  const openCreateForm = () => {
    setEditingPlayer(null);
    reset({ role: "BATSMAN" });
    setIsFormOpen((isOpen) => !isOpen);
  };

  const openEditForm = (player) => {
    setEditingPlayer(player);
    reset({
      name: player.name || "",
      role: player.role || "BATSMAN",
      country: player.country || "",
      imageUrl: player.imageUrl || "",
      battingStyle: player.battingStyle || "",
      bowlingStyle: player.bowlingStyle || "",
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingPlayer(null);
    reset({ role: "BATSMAN" });
    setIsFormOpen(false);
  };

  const handleSavePlayer = (data) => {
    const mutation = editingPlayer ? updatePlayerMutation : createPlayerMutation;
    const variables = editingPlayer ? { id: editingPlayer._id, data } : data;

    mutation.mutate(variables, {
      onSuccess: () => {
        closeForm();
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
        onPrimaryAction={openCreateForm}
        primaryAction={isFormOpen ? "Close Form" : "Add Player"}
        searchPlaceholder="Search player name, role, country..."
      />

      {isFormOpen && (
        <form className="grid gap-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card md:grid-cols-2 xl:grid-cols-3" onSubmit={handleSubmit(handleSavePlayer)}>
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
          {(createPlayerMutation.isError || updatePlayerMutation.isError) && (
            <StatusPill tone="live">Failed to save player</StatusPill>
          )}
          <div className="flex justify-end gap-sm md:col-span-2 xl:col-span-3">
            <AdminActionButton variant="secondary" onClick={closeForm}>Cancel</AdminActionButton>
            <AdminActionButton type="submit">
              {createPlayerMutation.isPending || updatePlayerMutation.isPending
                ? "Saving..."
                : editingPlayer
                  ? "Update Player"
                  : "Save Player"}
            </AdminActionButton>
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
        renderActions={(row) => (
          <>
            <AdminActionButton variant="secondary" onClick={() => openEditForm(row)}>Edit</AdminActionButton>
            <AdminActionButton variant="danger">Delete</AdminActionButton>
          </>
        )}
        rows={rows}
      />
    </div>
  );
};

export default AdminPlayers;
