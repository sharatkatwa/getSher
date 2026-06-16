const variants = {
  primary: "bg-primary text-on-primary hover:brightness-110",
  secondary:
    "border border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container",
  danger: "bg-error text-on-error hover:brightness-110",
};

const AdminActionButton = ({ children, onClick, type = "button", variant = "primary" }) => {
  return (
    <button
      className={`h-10 rounded-md px-md text-body-sm font-extrabold transition ${variants[variant]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default AdminActionButton;
