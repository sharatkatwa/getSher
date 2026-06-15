const AuthTextField = ({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
}) => {
  return (
    <label className="grid gap-xs">
      <span className="text-label-data text-on-surface-variant">{label}</span>
      <input
        autoComplete={autoComplete}
        className="h-12 rounded-md border border-outline-variant bg-surface px-md text-body-md text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
};

export default AuthTextField;
