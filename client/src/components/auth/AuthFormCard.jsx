import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { useLogin, useRegister } from "../../hooks/useAuth";
import { setUser } from "../../slices/userSlice";
import AuthDivider from "../shared/AuthDivider";
import AuthSubmitButton from "../shared/AuthSubmitButton";
import AuthTextField from "../shared/AuthTextField";
import GoogleAuthButton from "./GoogleAuthButton";

const getUserPayload = (user) => ({
  id: user?._id || user?.id || "",
  name: user?.name || "",
  email: user?.email || "",
  picture: user?.picture || "",
  role: user?.role || "",
});

const AuthFormCard = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isRegister = mode === "register";
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const [serverError, setServerError] = useState("");

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isPending = loginMutation.isPending || registerMutation.isPending;

  const onSubmit = async (values) => {
    setServerError("");

    const payload = {
      email: values.email,
      password: values.password,
    };

    if (isRegister) {
      payload.name = values.name;
    }

    try {
      const user = isRegister
        ? await registerMutation.mutateAsync(payload)
        : await loginMutation.mutateAsync(payload);

      dispatch(setUser(getUserPayload(user)));
      navigate("/", { replace: true });
    } catch (error) {
      setServerError(
        error?.response?.data?.message || "Authentication failed. Please try again.",
      );
    }
  };

  return (
    <form className="grid gap-md" onSubmit={handleSubmit(onSubmit)}>
      <GoogleAuthButton>
        {isRegister ? "Sign up with Google" : "Login with Google"}
      </GoogleAuthButton>
      <AuthDivider />

      {serverError && (
        <div className="rounded-md border border-error bg-error-container px-md py-sm text-body-sm font-bold text-on-error-container">
          {serverError}
        </div>
      )}

      {isRegister && (
        <AuthTextField
          autoComplete="name"
          error={errors.name?.message}
          label="Full name"
          placeholder="Virat Kohli"
          {...register("name", {
            required: "Full name is required.",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters.",
            },
          })}
        />
      )}

      <AuthTextField
        autoComplete="email"
        error={errors.email?.message}
        label="Email"
        placeholder="you@example.com"
        type="email"
        {...register("email", {
          required: "Email is required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address.",
          },
        })}
      />

      <AuthTextField
        autoComplete={isRegister ? "new-password" : "current-password"}
        error={errors.password?.message}
        label="Password"
        placeholder="Enter password"
        type="password"
        {...register("password", {
          required: "Password is required.",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters.",
          },
        })}
      />

      {isRegister && (
        <AuthTextField
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          label="Confirm password"
          placeholder="Re-enter password"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm your password.",
            validate: (value) =>
              value === watch("password") || "Passwords do not match.",
          })}
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

      <AuthSubmitButton disabled={isPending}>
        {isPending
          ? isRegister
            ? "Creating..."
            : "Logging in..."
          : isRegister
            ? "Create Account"
            : "Login"}
      </AuthSubmitButton>
    </form>
  );
};

export default AuthFormCard;
