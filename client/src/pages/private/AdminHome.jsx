import AdminMetricCard from "../../components/admin/AdminMetricCard";
import AdminTable from "../../components/admin/AdminTable";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";

const metrics = [
  { icon: "refresh", label: "Players", value: "128", helper: "18 recently updated profiles" },
  { icon: "teams", label: "Teams", value: "12", helper: "4 squads need final review" },
  { icon: "trophy", label: "Series", value: "6", helper: "2 live and 1 upcoming" },
  { icon: "chart", label: "Matches", value: "42", helper: "3 scheduled this week" },
];

const activityRows = [
  { id: 1, event: "India squad updated", owner: "Admin", type: "Team", status: "Published" },
  { id: 2, event: "BGT match venue changed", owner: "Scorer", type: "Match", status: "Review" },
  { id: 3, event: "England tour created", owner: "Admin", type: "Series", status: "Draft" },
];

const AdminHome = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="live">3 Live Tasks</StatusPill>}
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
          <StatusPill tone="neutral">Static Preview</StatusPill>
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
                <StatusPill tone={row.status === "Published" ? "completed" : "upcoming"}>
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
