import { useState } from "react";
import { useForm } from "react-hook-form";

import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useCreateMatch, useMatches } from "../../hooks/useMatches";
import { useSeries } from "../../hooks/useSeries";
import { useTeams } from "../../hooks/useTeams";

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
  ABANDONED: "neutral",
};

const AdminMatches = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { data, isError, isLoading } = useMatches();
  const { data: series = [] } = useSeries();
  const { teams = [] } = useTeams();
  const createMatchMutation = useCreateMatch();
  const matches = data?.matches || data || [];
  const upcomingCount = matches.filter((match) => match.status === "UPCOMING").length;
  const rows = matches.map((match) => ({
    ...match,
    match: `${match.team1?.name || "Team 1"} vs ${match.team2?.name || "Team 2"}`,
    series: match.seriesId?.name || match.matchNumber || "N/A",
    startTime: match.startTime ? new Date(match.startTime).toLocaleString() : "TBA",
  }));

  const handleCreateMatch = (formData) => {
    createMatchMutation.mutate(formData, {
      onSuccess: () => {
        reset();
        setIsFormOpen(false);
      },
    });
  };

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="upcoming">{upcomingCount} Upcoming</StatusPill>}
        description="Schedule fixtures, update venues, manage status, and prepare match operations."
        eyebrow="Fixtures"
        title="Manage Matches"
      />
      <AdminToolbar
        onPrimaryAction={() => setIsFormOpen((isOpen) => !isOpen)}
        primaryAction={isFormOpen ? "Close Form" : "Schedule Match"}
        searchPlaceholder="Search match, venue, or series..."
      />

      {isFormOpen && (
        <form className="grid gap-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card md:grid-cols-2 xl:grid-cols-3" onSubmit={handleSubmit(handleCreateMatch)}>
          <select {...register("seriesId", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary">
            <option value="">Select series</option>
            {series.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <select {...register("team1", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary">
            <option value="">Select team 1</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
          <select {...register("team2", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary">
            <option value="">Select team 2</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
          <input {...register("matchNumber")} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Match number" />
          <input {...register("venue", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Venue" />
          <input {...register("startTime", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" type="datetime-local" />
          {createMatchMutation.isError && (
            <StatusPill tone="live">Failed to create match</StatusPill>
          )}
          <div className="flex justify-end gap-sm md:col-span-2 xl:col-span-3">
            <AdminActionButton variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</AdminActionButton>
            <AdminActionButton type="submit">{createMatchMutation.isPending ? "Saving..." : "Save Match"}</AdminActionButton>
          </div>
        </form>
      )}

      {isLoading && <StatusPill tone="neutral">Loading matches...</StatusPill>}
      {isError && <StatusPill tone="live">Failed to load matches</StatusPill>}

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
              <StatusPill tone={toneByStatus[row.status] || "neutral"}>{row.status}</StatusPill>
            ),
          },
        ]}
        renderActions={() => (
          <>
            <AdminActionButton variant="secondary">Lineups</AdminActionButton>
            <AdminActionButton variant="secondary">Edit</AdminActionButton>
          </>
        )}
        rows={rows}
      />
    </div>
  );
};

export default AdminMatches;
