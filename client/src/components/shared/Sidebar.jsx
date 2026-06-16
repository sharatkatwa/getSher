import { NavLink } from "react-router";
import Icon from "./Icon";

const navItems = [
  { label: "Live Scores", icon: "bat", to: "/" },
  { label: "Series", icon: "trophy", to: "/series" },
  { label: "Teams", icon: "teams", to: "/teams" },
  { label: "Matches", icon: "chart", to: "/matches" },
  { label: "Players", icon: "refresh", to: "/players" },
];

const bottomItems = [
  { label: "Settings", icon: "settings" },
  { label: "Support", icon: "help" },
];

// Shared by desktop sidebar and mobile drawer so navigation stays identical.
const SidebarContent = ({ onNavigate }) => {
  return (
    <>
      <div className="flex items-center gap-sm">
        <div className="grid size-10 place-items-center rounded-full bg-primary text-on-primary">
          <Icon name="user" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-body-md font-bold text-on-surface">
            Premium Member
          </p>
          <p className="text-label-data text-on-surface-variant">
            Cricket Enthusiast
          </p>
        </div>
      </div>

      <NavLink
        className="mt-md rounded-md bg-live px-md py-sm text-center text-body-sm font-bold text-on-secondary"
        onClick={onNavigate}
        to="/login"
      >
        Login/Signup
      </NavLink>

      <nav className="mt-lg space-y-sm">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `flex h-14 w-full items-center gap-md rounded-md px-md text-left text-body-md transition ${
                isActive
                  ? "bg-live font-bold text-on-secondary"
                  : "text-on-surface-variant hover:bg-surface-container"
              }`
            }
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
        {bottomItems.map((item) => (
          <button
            className="flex h-14 w-full items-center gap-md rounded-md px-md text-left text-body-md text-on-surface-variant hover:bg-surface-container"
            key={item.label}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
};

const Sidebar = ({ isOpen = false, onClose }) => {
  return (
    <>
      <aside className="hidden min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-outline-variant bg-surface-container-lowest p-md lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      <div
        // Mobile backdrop closes the drawer without affecting desktop layout.
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-40 flex h-dvh w-72 max-w-[85vw] flex-col border-r border-outline-variant bg-surface-container-lowest p-md shadow-floating transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-md flex items-center justify-between">
          <p className="text-title-md font-extrabold text-primary">getSher</p>
          <button
            className="grid size-10 place-items-center rounded-full text-primary hover:bg-surface-container"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <SidebarContent onNavigate={onClose} />
      </aside>
    </>
  );
};

export default Sidebar;
