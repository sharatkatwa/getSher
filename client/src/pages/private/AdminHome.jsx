import AdminMetricCard from "../../components/admin/AdminMetricCard";
import AdminTable from "../../components/admin/AdminTable";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useMatches } from "../../hooks/useMatches";
import { usePlayers } from "../../hooks/usePlayers";
import { useSeries } from "../../hooks/useSeries";
import { useTeams } from "../../hooks/useTeams";

const AdminHome = () => {
  const { data: players = [] } = usePlayers();
  const { data: series = [] } = useSeries();
  const { teams = [] } = useTeams();
  const { data } = useMatches();
  const matches = data?.matches || data || [];
  const liveMatches = matches.filter((match) => match.status === "LIVE");

  const metrics = [
    {
      icon: "refresh",
      label: "Players",
      value: players.length,
      helper: "Profiles available for squads",
    },
    {
      icon: "teams",
      label: "Teams",
      value: teams.length,
      helper: "Registered teams",
    },
    {
      icon: "trophy",
      label: "Series",
      value: series.length,
      helper: `${series.filter((item) => item.status === "LIVE").length} live series`,
    },
    {
      icon: "chart",
      label: "Matches",
      value: matches.length,
      helper: `${liveMatches.length} currently live`,
    },
  ];

  const activityRows = matches.slice(0, 5).map((match) => ({
    _id: match._id,
    event: `${match.team1?.name || "Team 1"} vs ${match.team2?.name || "Team 2"}`,
    owner: match.seriesId?.name || "Match Ops",
    type: "Match",
    status: match.status,
  }));

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="live">{liveMatches.length} Live Tasks</StatusPill>}
        description="Manage match operations, teams, players, series, and playing XI setup from one control surface."
        eyebrow="Overview"
        title="Admin Dashboard"
      />

      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <AdminMetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <section className="space-y-md">
        <div className="flex items-center justify-between">
          <h2 className="text-title-md font-extrabold text-primary">Recent Operations</h2>
          <StatusPill tone="neutral">Latest Matches</StatusPill>
        </div>
        <AdminTable
          columns={[
            { key: "event", label: "Event" },
            { key: "owner", label: "Owner" },
            { key: "type", label: "Type" },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <StatusPill tone={row.status === "LIVE" ? "live" : "upcoming"}>
                  {row.status}
                </StatusPill>
              ),
            },
          ]}
          rows={activityRows}
        />
      </section>
    </div>
  );
};

export default AdminHome;
