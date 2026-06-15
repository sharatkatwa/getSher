const AuthShell = ({ eyebrow, title, description, children, footer }) => {
  return (
    <section className="grid min-h-[calc(100vh-4rem)] place-items-center px-md py-xl lg:px-lg">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-primary p-xl text-on-primary lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-label-caps text-secondary">getSher</p>
            <h1 className="mt-md text-headline-lg">Match Updates for serious cricket people.</h1>
            <p className="mt-md text-body-md text-on-primary/80">
              Track squads, series, fixtures, live score context, and admin workflows from one focused workspace.
            </p>
          </div>

          <div className="grid gap-sm">
            {["Live score operations", "Team and player control", "Series and match planning"].map((item) => (
              <div className="rounded-md bg-on-primary/10 px-md py-sm text-body-sm font-semibold" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-lg sm:p-xl">
          <div>
            <p className="text-label-caps text-live">{eyebrow}</p>
            <h2 className="mt-sm text-headline-lg text-primary">{title}</h2>
            <p className="mt-sm text-body-md text-on-surface-variant">{description}</p>
          </div>

          <div className="mt-lg">{children}</div>

          {footer && <div className="mt-lg text-center text-body-sm text-on-surface-variant">{footer}</div>}
        </div>
      </div>
    </section>
  );
};

export default AuthShell;
