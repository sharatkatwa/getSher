const balls = [
  {
    over: "90.0",
    label: "Wicket",
    title: "OUT! KOHLI C CAREY B CUMMINS 84(112)",
    text: "A massive blow for India right at the end of the day. A short delivery, Kohli tries to pull but gets a faint edge through to the keeper. The masterclass ends.",
    time: "16:42",
    tone: "bg-error-container/40 text-error",
  },
  {
    over: "89.4",
    label: "4 Runs",
    title: "FOUR! ELEGANT COVER DRIVE",
    text: "Overpitched from Cummins and Kohli leans into the drive. Pierces the gap between cover and mid-off with surgical precision.",
    time: "16:38",
    tone: "bg-secondary-container/20 text-primary",
  },
  {
    over: "89.3",
    label: "Dot",
    title: "Cummins to Kohli",
    text: "Good length delivery outside off, Kohli defends it solidly towards point. No run.",
    time: "16:37",
    tone: "bg-surface-container-lowest text-on-surface",
  },
  {
    over: "89.2",
    label: "1 Run",
    title: "Cummins to Jadeja",
    text: "Tucked away to deep square leg for a single. Jadeja gets Kohli back on strike.",
    time: "16:35",
    tone: "bg-surface-container-lowest text-on-surface",
  },
];

const Commentary = () => {
  return (
    <section>
      <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
        <h2 className="border-l-4 border-secondary pl-sm text-title-md font-bold text-primary">
          Live Commentary
        </h2>
        <div className="flex gap-xs">
          <span className="rounded-sm bg-surface-container px-sm py-xs text-label-data text-primary">IND vs AUS</span>
          <span className="rounded-sm bg-surface-container px-sm py-xs text-label-data text-on-surface-variant">1st Test</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
        {balls.map((ball) => (
          <article className={`border-b border-outline-variant p-md last:border-b-0 ${ball.tone}`} key={ball.over}>
            <div className="grid gap-sm sm:grid-cols-[3rem_1fr_3rem]">
              <div>
                <p className="text-title-md font-extrabold">{ball.over}</p>
                <p className="text-[10px] font-bold uppercase text-on-surface-variant">{ball.label}</p>
              </div>
              <div>
                <h3 className="text-body-md font-extrabold">{ball.title}</h3>
                <p className="mt-xs text-body-md text-on-surface-variant">{ball.text}</p>
              </div>
              <p className="text-right text-label-data text-on-surface-variant">{ball.time}</p>
            </div>
          </article>
        ))}
        <button className="w-full bg-surface-container px-md py-sm text-body-sm font-bold text-primary">
          Load Previous Overs
        </button>
      </div>
    </section>
  );
};

export default Commentary;
