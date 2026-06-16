import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

import { useLogout } from "../../hooks/useAuth";
import { clearUser } from "../../slices/userSlice";
import UserProfile from "./UserProfile";

const adminRoles = ["SUPER_ADMIN", "ADMIN", "SCORER"];

const ProfileMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const isAdmin = adminRoles.includes(user?.role);

  useEffect(() => {
    const closeMenu = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      dispatch(clearUser());
      setIsOpen(false);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="rounded-full hover:bg-surface-container"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <UserProfile compact user={user} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-floating"
          role="menu"
        >
          <div className="border-b border-outline-variant p-md">
            <UserProfile user={user} />
          </div>

          <div className="grid gap-xs p-sm">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    className="rounded-md px-md py-sm text-body-sm font-bold text-primary hover:bg-surface-container"
                    onClick={() => setIsOpen(false)}
                    role="menuitem"
                    to="/admin"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  className="rounded-md px-md py-sm text-left text-body-sm font-bold text-error hover:bg-error-container"
                  disabled={logoutMutation.isPending}
                  onClick={handleLogout}
                  role="menuitem"
                  type="button"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded-md px-md py-sm text-body-sm font-bold text-primary hover:bg-surface-container"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="rounded-md bg-primary px-md py-sm text-body-sm font-bold text-on-primary hover:brightness-110"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  to="/register"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
