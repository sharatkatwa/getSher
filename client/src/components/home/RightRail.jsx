import Icon from "../shared/Icon";

const upcoming = [
  { date: "Tomorrow • 14:00", match: "WI vs BAN", type: "ODI" },
  { date: "Nov 22 • 09:30", match: "SL vs AFG", type: "T20I" },
];

const table = [
  { team: "1. Australia", p: 12, w: 8, pct: "62.5" },
  { team: "2. India", p: 11, w: 7, pct: "58.3" },
  { team: "3. RSA", p: 9, w: 5, pct: "54.1" },
];

const UpcomingCard = () => (
  <section className="rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
    <div className="flex items-center justify-between bg-surface-container px-md py-sm">
      <h2 className="text-body-md font-extrabold text-primary">Upcoming</h2>
      <Icon name="calendar" className="h-4 w-4 text-on-surface-variant" />
    </div>
    <div className="divide-y divide-outline-variant p-md">
      {upcoming.map((item) => (
        <div className="py-sm first:pt-0 last:pb-0" key={item.match}>
          <p className="text-label-data text-on-surface-variant">{item.date}</p>
          <div className="mt-xs flex items-center justify-between gap-md">
            <p className="text-body-md font-extrabold text-on-surface">{item.match}</p>
            <span className="rounded-sm bg-surface-container px-sm py-xs text-label-data text-on-surface-variant">
              {item.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const WtcTable = () => (
  <section className="rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
    <div className="flex items-center justify-between px-md py-sm">
      <h2 className="text-body-md font-extrabold text-primary">WTC Table</h2>
      <button className="text-label-data font-bold text-primary">Full Table</button>
    </div>
    <table className="w-full text-left text-body-sm">
      <thead className="bg-surface-container text-label-data text-on-surface-variant">
        <tr>
          <th className="px-md py-sm">Team</th>
          <th className="px-xs py-sm">P</th>
          <th className="px-xs py-sm">W</th>
          <th className="px-md py-sm text-right">PCT</th>
        </tr>
      </thead>
      <tbody>
        {table.map((row) => (
          <tr className="border-t border-outline-variant" key={row.team}>
            <td className="px-md py-sm font-bold text-on-surface">{row.team}</td>
            <td className="px-xs py-sm text-on-surface-variant">{row.p}</td>
            <td className="px-xs py-sm text-on-surface-variant">{row.w}</td>
            <td className="px-md py-sm text-right font-extrabold text-primary">{row.pct}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

const FantasyCard = () => (
  <section className="relative overflow-hidden rounded-lg bg-primary p-lg text-center text-on-primary shadow-floating">
    <div className="absolute -right-12 -top-12 size-32 rounded-full bg-secondary/30" />
    <div className="absolute -bottom-16 left-4 size-36 rounded-full bg-tertiary/20" />
    <Icon name="trophy" className="relative mx-auto h-9 w-9 text-secondary" />
    <h2 className="relative mt-sm text-title-md font-extrabold">getSher Fantasy</h2>
    <p className="relative mx-auto mt-xs max-w-44 text-body-sm text-on-primary/80">
      Join the league and win big!
    </p>
    <button className="relative mt-md rounded-full bg-live px-xl py-sm text-body-sm font-extrabold text-on-secondary">
      Play Now
    </button>
  </section>
);

const RightRail = () => {
  return (
    <aside className="grid gap-lg lg:w-64 lg:shrink-0">
      <UpcomingCard />
      <WtcTable />
      <FantasyCard />
    </aside>
  );
};

export default RightRail;
