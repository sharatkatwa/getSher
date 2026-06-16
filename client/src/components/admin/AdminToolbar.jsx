import AdminActionButton from "./AdminActionButton";

const AdminToolbar = ({ onPrimaryAction, searchPlaceholder = "Search records...", primaryAction }) => {
  return (
    <div className="flex flex-col gap-sm rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card sm:flex-row sm:items-center sm:justify-between">
      <input
        className="h-10 min-w-0 rounded-md border border-outline-variant bg-surface px-md text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary"
        placeholder={searchPlaceholder}
      />
      <div className="flex gap-sm">
        <AdminActionButton variant="secondary">Filter</AdminActionButton>
        {primaryAction && <AdminActionButton onClick={onPrimaryAction}>{primaryAction}</AdminActionButton>}
      </div>
    </div>
  );
};

export default AdminToolbar;
