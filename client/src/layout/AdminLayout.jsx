import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import AdminSidebar from "../components/shared/AdminSidebar";
import AdminTopBar from "../components/shared/AdminTopBar";
import { useMe } from "../hooks/useAuth";

const adminRoles = ["SUPER_ADMIN", "ADMIN", "SCORER"];

const AdminLayout = () => {
  // Admin has its own drawer state so public/admin shells do not affect each other.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { data: user, isError, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-md text-center text-on-background">
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-card">
          <p className="text-title-md font-extrabold text-primary">Checking access...</p>
          <p className="mt-xs text-body-sm text-on-surface-variant">
            Please wait while we verify your admin session.
          </p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />;
  }

  if (!adminRoles.includes(user.role)) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminTopBar onMenuClick={() => setIsSidebarOpen(true)} user={user} />
      <div className="flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          user={user}
        />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
