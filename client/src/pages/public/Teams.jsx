import PageHeader from "../../components/shared/PageHeader";
import StatBadge from "../../components/shared/StatBadge";
import StatusPill from "../../components/shared/StatusPill";
import TeamBadge from "../../components/home/TeamBadge";

const teams = [
  { code: "IND", name: "India", shortName: "IND", players: 18, color: "Blue", form: "W W L W" },
  { code: "AUS", name: "Australia", shortName: "AUS", players: 17, color: "Green", form: "W L W W" },
  { code: "ENG", name: "England", shortName: "ENG", players: 16, color: "Navy", form: "L W W L" },
  { code: "RSA", name: "South Africa", shortName: "RSA", players: 15, color: "Green", form: "W W W L" },
];

const Teams = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        description="Static overview of team identities, squad strength, and current run of results."
        eyebrow="Squads"
        title="Teams"
        action={<StatusPill tone="primary">{teams.length} Teams</StatusPill>}
      />

      <div className="grid gap-md md:grid-cols-2">
        {teams.map((team) => (
          <article
            className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card transition hover:border-primary"
            key={team.code}
          >
            <div className="flex items-center gap-md">
              <TeamBadge code={team.code} />
              <div className="min-w-0 flex-1">
                <h2 className="text-title-md font-extrabold text-on-surface">{team.name}</h2>
                <p className="text-label-data text-on-surface-variant">{team.shortName} squad profile</p>
              </div>
              <StatusPill tone="completed">Active</StatusPill>
            </div>

            <div className="mt-md grid grid-cols-3 gap-sm">
              <StatBadge label="Players" value={team.players} />
              <StatBadge label="Color" value={team.color} />
              <StatBadge label="Form" value={team.form} />
            </div>

            <div className="mt-md h-2 overflow-hidden rounded-full bg-surface-container">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Teams;
