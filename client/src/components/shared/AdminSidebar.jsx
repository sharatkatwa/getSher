import { NavLink } from "react-router";
import Icon from "./Icon";
import UserProfile from "./UserProfile";

const navItems = [
  { label: "Dashboard", icon: "dashboard", to: "/admin" },
  { label: "Manage Players", icon: "refresh", to: "/admin/players" },
  { label: "Manage Teams", icon: "teams", to: "/admin/teams" },
  { label: "Manage Series", icon: "trophy", to: "/admin/series" },
  { label: "Manage Matches", icon: "chart", to: "/admin/matches" },
  { label: "Playing XI", icon: "shield", to: "/admin/playing-xi" },
  { label: "Live Scoring", icon: "activity", to: "/admin/scoring" },
];

const utilityItems = [
  { label: "Public Site", icon: "arrow", to: "/" },
  { label: "Settings", icon: "settings", to: "/admin/settings" },
];

// Shared by desktop admin sidebar and mobile admin drawer.
const AdminSidebarContent = ({ onNavigate, user }) => {
  return (
    <>
      <div className="rounded-lg bg-primary p-md text-on-primary">
        <p className="text-label-caps text-secondary">Admin Console</p>
        <h2 className="mt-xs text-title-md font-extrabold">getSher Control</h2>
        <p className="mt-xs text-body-sm text-on-primary/75">
          Operations, squads, fixtures, and score setup.
        </p>
      </div>

      <div className="mt-md rounded-lg border border-outline-variant bg-surface-container-lowest p-sm">
        <UserProfile user={user} />
      </div>

      <nav className="mt-lg space-y-sm">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `flex h-12 w-full items-center gap-md rounded-md px-md text-left text-body-md transition ${
                isActive
                  ? "bg-primary font-bold text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`
            }
            end={item.to === "/admin"}
            key={item.label}
            onClick={onNavigate}
            to={item.to}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <nav className="mt-auto border-t border-outline-variant pt-lg">
        {utilityItems.map((item) => (
          <NavLink
            className="flex h-12 w-full items-center gap-md rounded-md px-md text-left text-body-md text-on-surface-variant hover:bg-surface-container"
            key={item.label}
            onClick={onNavigate}
            to={item.to}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

const AdminSidebar = ({ isOpen = false, onClose, user }) => {
  return (
    <>
      <aside className="hidden min-h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-outline-variant bg-surface-container-lowest p-md lg:flex lg:flex-col">
        <AdminSidebarContent user={user} />
      </aside>

      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-40 flex h-dvh w-80 max-w-[88vw] flex-col border-r border-outline-variant bg-surface-container-lowest p-md shadow-floating transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-md flex items-center justify-between">
          <p className="text-title-md font-extrabold text-primary">Admin</p>
          <button
            className="grid size-10 place-items-center rounded-full text-primary hover:bg-surface-container"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <AdminSidebarContent onNavigate={onClose} user={user} />
      </aside>
    </>
  );
};

export default AdminSidebar;
