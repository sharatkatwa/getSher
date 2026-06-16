import { useState } from "react";
import { useForm } from "react-hook-form";

import AdminActionButton from "../../components/admin/AdminActionButton";
import AdminTable from "../../components/admin/AdminTable";
import AdminToolbar from "../../components/admin/AdminToolbar";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useCreateSeries, useSeries, useUpdateSeries } from "../../hooks/useSeries";

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
};

const AdminSeries = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState(null);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { status: "UPCOMING" },
  });
  const { data: series = [], isError, isLoading } = useSeries();
  const createSeriesMutation = useCreateSeries();
  const updateSeriesMutation = useUpdateSeries();
  const liveCount = series.filter((item) => item.status === "LIVE").length;
  const rows = series.map((item) => ({
    ...item,
    matches: item.matches?.length || 0,
  }));

  const openCreateForm = () => {
    setEditingSeries(null);
    reset({ status: "UPCOMING" });
    setIsFormOpen((isOpen) => !isOpen);
  };

  const openEditForm = (seriesItem) => {
    setEditingSeries(seriesItem);
    reset({
      name: seriesItem.name || "",
      shortName: seriesItem.shortName || "",
      season: seriesItem.season || "",
      status: seriesItem.status || "UPCOMING",
      logo: seriesItem.logo || "",
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingSeries(null);
    reset({ status: "UPCOMING" });
    setIsFormOpen(false);
  };

  const handleSaveSeries = (data) => {
    const payload = { ...data, shortName: data.shortName.toUpperCase() };
    const mutation = editingSeries ? updateSeriesMutation : createSeriesMutation;
    const variables = editingSeries ? { id: editingSeries._id, data: payload } : payload;

    mutation.mutate(variables, {
      onSuccess: () => {
        closeForm();
      },
    });
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
        onPrimaryAction={openCreateForm}
        primaryAction={isFormOpen ? "Close Form" : "Create Series"}
        searchPlaceholder="Search series name or season..."
      />

      {isFormOpen && (
        <form className="grid gap-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card md:grid-cols-2 xl:grid-cols-5" onSubmit={handleSubmit(handleSaveSeries)}>
          <input {...register("name", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Series name" />
          <input {...register("shortName", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm uppercase outline-none focus:border-primary" placeholder="Short name" />
          <input {...register("season", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Season" />
          <select {...register("status", { required: true })} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary">
            <option>UPCOMING</option>
            <option>LIVE</option>
            <option>COMPLETED</option>
          </select>
          <input {...register("logo")} className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary" placeholder="Logo URL" />
          {(createSeriesMutation.isError || updateSeriesMutation.isError) && (
            <StatusPill tone="live">Failed to save series</StatusPill>
          )}
          <div className="flex justify-end gap-sm md:col-span-2 xl:col-span-5">
            <AdminActionButton variant="secondary" onClick={closeForm}>Cancel</AdminActionButton>
            <AdminActionButton type="submit">
              {createSeriesMutation.isPending || updateSeriesMutation.isPending
                ? "Saving..."
                : editingSeries
                  ? "Update Series"
                  : "Save Series"}
            </AdminActionButton>
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
        renderActions={(row) => (
          <>
            <AdminActionButton variant="secondary">Fixtures</AdminActionButton>
            <AdminActionButton variant="secondary" onClick={() => openEditForm(row)}>Edit</AdminActionButton>
          </>
        )}
        rows={rows}
      />
    </div>
  );
};

export default AdminSeries;
