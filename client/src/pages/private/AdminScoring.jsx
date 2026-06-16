import AdminActionButton from "../../components/admin/AdminActionButton";
import PageHeader from "../../components/shared/PageHeader";
import StatBadge from "../../components/shared/StatBadge";
import StatusPill from "../../components/shared/StatusPill";

const scoreButtons = ["0", "1", "2", "3", "4", "6", "WD", "NB", "W"];

const commentaryRows = [
  {
    over: "90.0",
    type: "WICKET",
    text: "OUT! Kohli edges behind after a masterful 84.",
    time: "16:42",
  },
  {
    over: "89.4",
    type: "FOUR",
    text: "Elegant cover drive through extra cover. Perfect timing.",
    time: "16:38",
  },
  {
    over: "89.3",
    type: "NORMAL",
    text: "Good length outside off, defended towards point.",
    time: "16:37",
  },
];

const AdminScoring = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="live">Live Scoring</StatusPill>}
        description="Update innings score, wickets, overs, and ball-by-ball commentary from one control surface."
        eyebrow="Scorer Desk"
        title="Live Score & Commentary"
      />

      <section className="grid gap-md xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card">
          <div className="flex flex-col gap-sm border-b border-outline-variant pb-md md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-label-caps text-live">Selected Match</p>
              <h2 className="text-title-md font-extrabold text-primary">
                India vs Australia
              </h2>
              <p className="text-body-sm text-on-surface-variant">
                1st Test · Border-Gavaskar Trophy · Melbourne
              </p>
            </div>
            <select className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm font-bold text-on-surface outline-none focus:border-primary">
              <option>India vs Australia</option>
              <option>England vs South Africa</option>
            </select>
          </div>

          <div className="grid gap-md md:grid-cols-4">
            <StatBadge label="Score" value="342/8" />
            <StatBadge label="Overs" value="90.0" />
            <StatBadge label="Run Rate" value="3.80" />
            <StatBadge label="Innings" value="1st" />
          </div>

          <div className="grid gap-md lg:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border border-outline-variant bg-surface p-md">
              <h3 className="text-body-md font-extrabold text-primary">
                Ball Update
              </h3>
              <div className="mt-md grid grid-cols-3 gap-sm">
                {scoreButtons.map((item) => (
                  <button
                    className={`h-12 rounded-md text-body-md font-extrabold transition ${
                      item === "W"
                        ? "bg-error text-on-error"
                        : item === "4" || item === "6"
                          ? "bg-live text-on-secondary"
                          : "bg-surface-container text-primary hover:bg-primary hover:text-on-primary"
                    }`}
                    key={item}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant bg-surface p-md">
              <h3 className="text-body-md font-extrabold text-primary">
                Manual Score
              </h3>
              <div className="mt-md grid grid-cols-2 gap-sm">
                <input
                  className="h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  placeholder="Runs"
                />
                <input
                  className="h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  placeholder="Wickets"
                />
                <input
                  className="h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  placeholder="Overs"
                />
                <input
                  className="h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  placeholder="Run rate"
                />
              </div>
              <div className="mt-md flex justify-end">
                <AdminActionButton>Update Score</AdminActionButton>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card">
          <div>
            <p className="text-label-caps text-live">At Crease</p>
            <h2 className="mt-xs text-title-md font-extrabold text-primary">
              Kohli 84* · Jadeja 12*
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Bowler: Pat Cummins · Last ball: wicket
            </p>
          </div>

          <div className="grid gap-sm">
            <StatBadge label="Batting Team" value="India" />
            <StatBadge label="Target" value="-" />
            <StatBadge label="Status" value="LIVE" />
          </div>
        </aside>
      </section>

      <section className="grid gap-md xl:grid-cols-[0.85fr_1.15fr]">
        <form className="space-y-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card">
          <div>
            <p className="text-label-caps text-live">Commentary</p>
            <h2 className="mt-xs text-title-md font-extrabold text-primary">
              Add Ball Commentary
            </h2>
          </div>

          <div className="grid gap-sm sm:grid-cols-3">
            <input
              className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary"
              placeholder="Over"
            />
            <input
              className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary"
              placeholder="Ball"
            />
            <select className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary">
              <option>NORMAL</option>
              <option>FOUR</option>
              <option>SIX</option>
              <option>WICKET</option>
              <option>MILESTONE</option>
            </select>
          </div>

          <textarea
            className="min-h-32 w-full resize-y rounded-md border border-outline-variant bg-surface px-md py-sm text-body-sm outline-none placeholder:text-on-surface-variant focus:border-primary"
            placeholder="Write commentary..."
          />

          <div className="flex justify-end gap-sm">
            <AdminActionButton variant="secondary">Clear</AdminActionButton>
            <AdminActionButton>Publish</AdminActionButton>
          </div>
        </form>

        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
          <div className="flex items-center justify-between border-b border-outline-variant p-md">
            <h2 className="text-title-md font-extrabold text-primary">
              Recent Commentary
            </h2>
            <StatusPill tone="neutral">Static Preview</StatusPill>
          </div>
          <div className="divide-y divide-outline-variant">
            {commentaryRows.map((item) => (
              <article className="grid gap-sm p-md sm:grid-cols-[5rem_1fr_auto]" key={`${item.over}-${item.time}`}>
                <div>
                  <p className="text-body-md font-extrabold text-primary">{item.over}</p>
                  <p className="text-label-data text-on-surface-variant">Over</p>
                </div>
                <div>
                  <StatusPill tone={item.type === "WICKET" ? "live" : item.type === "FOUR" ? "primary" : "neutral"}>
                    {item.type}
                  </StatusPill>
                  <p className="mt-xs text-body-sm text-on-surface">{item.text}</p>
                </div>
                <p className="text-label-data text-on-surface-variant">{item.time}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminScoring;
