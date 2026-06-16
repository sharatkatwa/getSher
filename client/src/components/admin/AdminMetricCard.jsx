import Icon from "../shared/Icon";

const AdminMetricCard = ({ icon, label, value, helper }) => {
  return (
    <article className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card">
      <div className="flex items-start justify-between gap-md">
        <div>
          <p className="text-label-data text-on-surface-variant">{label}</p>
          <p className="mt-xs text-headline-lg text-primary">{value}</p>
        </div>
        <div className="grid size-11 place-items-center rounded-md bg-primary-container text-primary">
          <Icon name={icon} className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-sm text-body-sm text-on-surface-variant">{helper}</p>
    </article>
  );
};

export default AdminMetricCard;
