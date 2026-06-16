import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/shared/Sidebar";
import TopBar from "../components/shared/TopBar";
import { useMe } from "../hooks/useAuth";


const AppLayout = () => {
  const { data: user } = useMe();
  // Local state keeps the mobile drawer isolated to this layout.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <TopBar onMenuClick={() => setIsSidebarOpen(true)} user={user} />
      <div className="flex">
        <Sidebar
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

export default AppLayout;
