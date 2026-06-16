import { Link } from "react-router";
import AuthFormCard from "../../components/auth/AuthFormCard";
import AuthShell from "../../components/auth/AuthShell";

const Register = () => {
  return (
    <AuthShell
      description="Create your workspace for managing cricket data, teams, players, series, and match operations."
      eyebrow="Start your innings"
      footer={
        <>
          Already have an account?{" "}
          <Link className="font-bold text-primary" to="/login">
            Login
          </Link>
        </>
      }
      title="Create your account"
    >
      <AuthFormCard mode="register" />
    </AuthShell>
  );
};

export default Register;
