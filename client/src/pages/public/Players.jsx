import Icon from "../../components/shared/Icon";
import PageHeader from "../../components/shared/PageHeader";
import StatBadge from "../../components/shared/StatBadge";
import StatusPill from "../../components/shared/StatusPill";

const players = [
  {
    name: "Virat Kohli",
    role: "BATSMAN",
    country: "India",
    batting: "Right hand bat",
    bowling: "Right arm medium",
    form: "84*",
    matches: 302,
    accent: "IND",
  },
  {
    name: "Pat Cummins",
    role: "BOWLER",
    country: "Australia",
    batting: "Right hand bat",
    bowling: "Right arm fast",
    form: "4/67",
    matches: 128,
    accent: "AUS",
  },
  {
    name: "Jos Buttler",
    role: "WICKET_KEEPER",
    country: "England",
    batting: "Right hand bat",
    bowling: "N/A",
    form: "52",
    matches: 190,
    accent: "ENG",
  },
  {
    name: "Kagiso Rabada",
    role: "BOWLER",
    country: "South Africa",
    batting: "Left hand bat",
    bowling: "Right arm fast",
    form: "3/41",
    matches: 159,
    accent: "RSA",
  },
];

const Players = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        description="Browse player profiles, current form, roles, and cricketing styles across international squads."
        eyebrow="Roster"
        title="Players"
        action={<StatusPill tone="primary">{players.length} Active Players</StatusPill>}
      />

      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-4">
        {players.map((player) => (
          <article
            className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card transition hover:border-primary"
            key={player.name}
          >
            <div className="flex items-start justify-between gap-md">
              <div className="grid size-14 place-items-center rounded-lg bg-primary text-title-md font-extrabold text-on-primary">
                {player.accent}
              </div>
              <StatusPill tone="neutral">{player.role}</StatusPill>
            </div>

            <h2 className="mt-md text-title-md font-extrabold text-on-surface">{player.name}</h2>
            <p className="text-body-sm text-on-surface-variant">{player.country}</p>

            <div className="mt-md grid gap-sm">
              <div className="flex items-center gap-sm text-body-sm text-on-surface-variant">
                <Icon name="bat" className="h-4 w-4 text-primary" />
                {player.batting}
              </div>
              <div className="flex items-center gap-sm text-body-sm text-on-surface-variant">
                <Icon name="activity" className="h-4 w-4 text-primary" />
                {player.bowling}
              </div>
            </div>

            <div className="mt-md grid grid-cols-2 gap-sm">
              <StatBadge label="Form" value={player.form} />
              <StatBadge label="Matches" value={player.matches} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Players;
