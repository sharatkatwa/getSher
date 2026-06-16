import { useAuth } from "../../hooks/useAuth";
import AuthDivider from "../shared/AuthDivider";
import AuthSubmitButton from "../shared/AuthSubmitButton";
import AuthTextField from "../shared/AuthTextField";
import GoogleAuthButton from "./GoogleAuthButton";


const AuthFormCard = ({ mode }) => {
  const isRegister = mode === "register";
  const {
    register,
    handleSubmit,
    errors,
    watch,
    onSubmit,
  } = useAuth()

  const password = watch("password");

  return (
    // Static UI only for now; API submission can be added here later.
    <form
      className="grid gap-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <GoogleAuthButton
      >{isRegister ? "Sign up with Google" : "Login with Google"}</GoogleAuthButton>
      <AuthDivider />

      {isRegister && (
        <AuthTextField
          register={register}
          error={errors.name}
          validation={{
            required: "Name is required",
          }}
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
        register={register}
        error={errors.email}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email",
          },
        }}
      />

      <AuthTextField
        autoComplete={isRegister ? "new-password" : "current-password"}
        label="Password"
        name="password"
        placeholder="Enter password"
        type="password"
        register={register}
        error={errors.password}
        validation={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum 6 characters",
          },
        }}
      />

      {isRegister && (
        <AuthTextField

          autoComplete="new-password"
          label="Confirm password"
          name="confirmPassword"
          placeholder="Re-enter password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          validation={{
            required: "Confirm password is required",
            validate: (value) =>
              value === password || "Passwords do not match",
          }}
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
