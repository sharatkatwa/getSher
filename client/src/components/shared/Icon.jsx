import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  CircleHelp,
  Dumbbell,
  Menu,
  PanelLeft,
  RefreshCcw,
  Search,
  Settings,
  Shield,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";

const icons = {
  activity: Activity,
  arrow: ArrowRight,
  bat: Dumbbell,
  bell: Bell,
  calendar: CalendarDays,
  chart: BarChart3,
  close: X,
  help: CircleHelp,
  menu: Menu,
  dashboard: PanelLeft,
  refresh: RefreshCcw,
  search: Search,
  settings: Settings,
  shield: Shield,
  teams: Users,
  trophy: Trophy,
  user: User,
};

// Centralizes Lucide icon usage so feature components can use stable semantic names.
const Icon = ({ name, className = "h-5 w-5" }) => {
  const LucideIcon = icons[name] || CircleHelp;

  return (
    <LucideIcon aria-hidden="true" className={className} strokeWidth={2} />
  );
};

export default Icon;
