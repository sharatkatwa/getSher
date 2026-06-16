import AuthDivider from "../shared/AuthDivider";
import AuthSubmitButton from "../shared/AuthSubmitButton";
import AuthTextField from "../shared/AuthTextField";
import GoogleAuthButton from "./GoogleAuthButton";

const AuthFormCard = ({ mode }) => {
  const isRegister = mode === "register";

  return (
    // Static UI only for now; API submission can be added here later.
    <form className="grid gap-md">
      <GoogleAuthButton
      >{isRegister ? "Sign up with Google" : "Login with Google"}</GoogleAuthButton>
      <AuthDivider />

      {isRegister && (
      <AuthTextField
        autoComplete="name"
        label="Full name"
        name="name"
        placeholder="Virat Kohli"
      />
      )}

      <AuthTextField
        autoComplete="email"
        label="Email"
        name="email"
        placeholder="you@example.com"
        type="email"
      />

      <AuthTextField
        autoComplete={isRegister ? "new-password" : "current-password"}
        label="Password"
        name="password"
        placeholder="Enter password"
        type="password"
      />

      {isRegister && (
        <AuthTextField
          autoComplete="new-password"
          label="Confirm password"
          name="confirmPassword"
          placeholder="Re-enter password"
          type="password"
        />
      )}

      {!isRegister && (
        <div className="flex items-center justify-between gap-md">
          <label className="flex items-center gap-xs text-body-sm text-on-surface-variant">
            <input className="size-4 accent-primary" type="checkbox" />
            Remember me
          </label>
          <button className="text-body-sm font-bold text-primary" type="button">
            Forgot password?
          </button>
        </div>
      )}

      <AuthSubmitButton>{isRegister ? "Create Account" : "Login"}</AuthSubmitButton>
    </form>
  );
};

export default AuthFormCard;
