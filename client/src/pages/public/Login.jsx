
import { Link } from "react-router";
import AuthFormCard from "../../components/auth/AuthFormCard";
import AuthShell from "../../components/auth/AuthShell";

// Static auth screen; form behavior can be connected when auth API flow is ready.
const Login = () => {
  return (
    <AuthShell
      description="Access your match center, admin controls, saved teams, and live cricket workspace."
      eyebrow="Welcome back"
      footer={
        <>
          New to getSher?{" "}
          <Link className="font-bold text-primary" to="/register">
            Create an account
          </Link>
        </>
      }
      title="Login to continue"
    >
      <AuthFormCard mode="login" />
    </AuthShell>
  );
};

export default Login
