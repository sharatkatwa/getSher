import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/shared/Sidebar";
import TopBar from "../components/shared/TopBar";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex">
        <Sidebar
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

export default AppLayout;
