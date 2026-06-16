import { useState } from "react";
import { useForm } from "react-hook-form";

import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useCreateSeries, useSeries } from "../../hooks/useSeries";

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
};

const AdminSeries = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { status: "UPCOMING" },
  });
  const { data: series = [], isError, isLoading } = useSeries();
  const createSeriesMutation = useCreateSeries();
  const liveCount = series.filter((item) => item.status === "LIVE").length;
  const rows = series.map((item) => ({
    ...item,
    matches: item.matches?.length || 0,
  }));

  const handleCreateSeries = (data) => {
    createSeriesMutation.mutate(
      { ...data, shortName: data.shortName.toUpperCase() },
      {
        onSuccess: () => {
          reset();
          setIsFormOpen(false);
        },
      },
    );
  };

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="live">{liveCount} Live Series</StatusPill>}
        description="Create tournament seasons, track status, and prepare series metadata for fixtures."
        eyebrow="Calendar"
        title="Manage Series"
      />
      <AdminToolbar
        onPrimaryAction={() => setIsFormOpen((isOpen) => !isOpen)}
        primaryAction={isFormOpen ? "Close Form" : "Create Series"}
        searchPlaceholder="Search series name or season..."
      />

      {isFormOpen && (
        <form className="grid gap-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card md:grid-cols-2 xl:grid-cols-5" onSubmit={handleSubmit(handleCreateSeries)}>
          <input {...register("name", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Series name" />
          <input {...register("shortName", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm uppercase outline-none focus:border-primary" placeholder="Short name" />
          <input {...register("season", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Season" />
          <select {...register("status", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary">
            <option>UPCOMING</option>
            <option>LIVE</option>
            <option>COMPLETED</option>
          </select>
          <input {...register("logo")} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Logo URL" />
          {createSeriesMutation.isError && (
            <StatusPill tone="live">Failed to create series</StatusPill>
          )}
          <div className="flex justify-end gap-sm md:col-span-2 xl:col-span-5">
            <AdminActionButton variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</AdminActionButton>
            <AdminActionButton type="submit">{createSeriesMutation.isPending ? "Saving..." : "Save Series"}</AdminActionButton>
          </div>
        </form>
      )}

      {isLoading && <StatusPill tone="neutral">Loading series...</StatusPill>}
      {isError && <StatusPill tone="live">Failed to load series</StatusPill>}

      <AdminTable
        columns={[
          { key: "name", label: "Series" },
          { key: "season", label: "Season" },
          { key: "matches", label: "Matches" },
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
            <AdminActionButton variant="secondary">Fixtures</AdminActionButton>
            <AdminActionButton variant="secondary">Edit</AdminActionButton>
          </>
        )}
        rows={rows}
      />
    </div>
  );
};

export default AdminSeries;
