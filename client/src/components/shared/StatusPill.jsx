const tones = {
  live: "bg-error-container text-on-error-container",
  upcoming: "bg-secondary-container text-on-secondary-container",
  completed: "bg-success/10 text-success",
  neutral: "bg-surface-container text-on-surface-variant",
  primary: "bg-primary-container text-on-primary-container",
};

const StatusPill = ({ children, tone = "neutral" }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-sm py-xs text-label-data font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

export default StatusPill;
