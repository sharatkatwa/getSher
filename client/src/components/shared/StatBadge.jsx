const StatBadge = ({ label, value }) => {
  return (
    <div className="rounded-md bg-surface-container px-sm py-xs">
      <p className="text-label-data text-on-surface-variant">{label}</p>
      <p className="text-body-md font-extrabold text-primary">{value}</p>
    </div>
  );
};

export default StatBadge;
