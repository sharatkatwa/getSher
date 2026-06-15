import { useState } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../components/shared/AdminSidebar";
import AdminTopBar from "../components/shared/AdminTopBar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <AdminTopBar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
