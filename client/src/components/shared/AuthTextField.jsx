import { forwardRef } from "react";

const AuthTextField = forwardRef(({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  error,
  ...inputProps
}, ref) => {
  return (
    <label className="grid gap-xs">
      <span className="text-label-data text-on-surface-variant">{label}</span>
      <input
        autoComplete={autoComplete}
        className={`h-12 rounded-md border bg-surface px-md text-body-md text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary/15 ${
          error ? "border-error focus:border-error" : "border-outline-variant focus:border-primary"
        }`}
        name={name}
        placeholder={placeholder}
        ref={ref}
        type={type}
        {...inputProps}
      />
      {error && <span className="text-label-data text-error">{error}</span>}
    </label>
  );
});

AuthTextField.displayName = "AuthTextField";

export default AuthTextField;
