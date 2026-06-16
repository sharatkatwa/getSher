const MATCH_TYPES = ["T20", "ODI", "TEST"];
const MATCH_STATUS = [
  ["UPCOMING", "UPCOMING", "..."],
  ["LIVE", "LIVE", "ON"],
  ["COMPLETED", "FINISHED", "OK"],
  ["ABANDONED", "ABANDONED", "X"],
];

const field =
  "w-full rounded-sm border border-outline-variant bg-white px-sm text-body-md text-on-surface outline-none transition focus:border-primary";
const label = "mb-xs block text-label-data font-bold uppercase tracking-wide text-on-surface";

const errorText = (error) =>
  error ? <p className="mt-xs text-body-sm font-semibold text-error">{error.message}</p> : null;

const Section = ({ title, children, className = "" }) => (
  <section className={className}>
    <div className="mb-md text-label-data font-extrabold uppercase tracking-wide text-on-surface-variant">
      {title}
    </div>
    {children}
  </section>
);

const SelectField = ({ name, title, register, options, placeholder, rules, error, className = "" }) => (
  <div className={className}>
    <label className={label}>{title}</label>
    <select {...register(name, rules)} className={`${field} h-11`}>
      <option value="">{placeholder}</option>
      {options.map(({ value, label: optionLabel }) => (
        <option key={value} value={value}>{optionLabel}</option>
      ))}
    </select>
    {errorText(error)}
  </div>
);

const InputField = ({ name, title, type = "text", register, placeholder, rules, error }) => (
  <div>
    <label className={label}>{title}</label>
    <input type={type} placeholder={placeholder} {...register(name, rules)} className={`${field} h-11 placeholder:text-on-surface-variant`} />
    {errorText(error)}
  </div>
);

export const FormHeader = ({ isEdit, isSaving }) => (
  <header className="flex flex-col gap-md border-b border-outline-variant bg-[#f1f5ff] px-lg py-lg lg:flex-row lg:items-center lg:justify-between">
    <div>
      <h2 className="text-headline-md font-extrabold leading-tight text-on-surface">Match Configuration</h2>
      <p className="mt-xs text-body-md text-on-surface-variant">
        {isEdit ? "Update fixture details and match operations in the system." : "Fill in the details to schedule a new fixture in the system."}
      </p>
    </div>
    <button type="submit" disabled={isSaving} className="h-11 rounded-md bg-primary px-md text-label-data font-extrabold uppercase text-on-primary transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
      {isSaving ? "Saving..." : isEdit ? "Update Match" : "Create Match"}
    </button>
  </header>
);

export const CoreSection = ({ register, seriesOptions, selectedType, errors }) => (
  <Section title="Core Information">
    <div className="grid gap-md lg:grid-cols-[1fr_280px] lg:items-end">
      <SelectField name="seriesId" title="Series Selection" register={register} options={seriesOptions} placeholder="Select a Series / Tournament" rules={{ required: "Series is required" }} error={errors.seriesId} />
      <div>
        <label className={label}>Match Type</label>
        <div className="grid grid-cols-3 gap-xs">
          {MATCH_TYPES.map((type) => (
            <label key={type} className={`grid h-11 cursor-pointer place-items-center rounded-sm border text-body-md font-extrabold transition ${selectedType === type ? "border-green-600 bg-green-400 text-green-950" : "border-outline-variant bg-white text-primary hover:border-primary"}`}>
              <input type="radio" value={type} {...register("matchType")} className="sr-only" />
              {type}
            </label>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const TeamCard = ({ title, name, placeholder, register, teams, error, rules }) => (
  <div className="rounded-md border border-outline-variant bg-[#eef4ff] p-md">
    <div className="flex items-center gap-sm">
      <div className="grid size-12 shrink-0 place-items-center rounded-sm border border-outline-variant bg-white text-title-sm font-extrabold text-on-surface-variant">SH</div>
      <SelectField name={name} title={title} register={register} options={teams} placeholder={placeholder} rules={rules} error={error} className="min-w-0 flex-1" />
    </div>
  </div>
);

export const CompetitorsSection = ({ register, teams, errors, team1Id }) => (
  <Section title="Competitors">
    <div className="relative grid gap-md lg:grid-cols-2 lg:items-center">
      <TeamCard title="Team 1 (Home)" name="team1Id" placeholder="Select Home Team" register={register} teams={teams} error={errors.team1Id} rules={{ required: "Home team is required" }} />
      <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-sm border border-outline-variant bg-white px-xs py-sm text-label-data font-extrabold text-on-surface-variant lg:block">VS</div>
      <TeamCard title="Team 2 (Away)" name="team2Id" placeholder="Select Away Team" register={register} teams={teams} error={errors.team2Id} rules={{ required: "Away team is required", validate: (value) => value !== team1Id || "Away team must be different" }} />
    </div>
  </Section>
);

export const ScheduleSection = ({ register, errors }) => (
  <Section title="Schedule & Venue">
    <div className="grid gap-md lg:grid-cols-3">
      <InputField name="matchDate" title="Match Date" type="date" register={register} rules={{ required: "Match date is required" }} error={errors.matchDate} />
      <InputField name="startTime" title="Start Time (GMT)" type="time" register={register} rules={{ required: "Start time is required" }} error={errors.startTime} />
      <InputField name="venue" title="Venue" placeholder="e.g. Lord's Cricket Ground" register={register} rules={{ required: "Venue is required", minLength: { value: 2, message: "Venue is too short" } }} error={errors.venue} />
    </div>
  </Section>
);

export const StatusSection = ({ register, selectedStatus }) => (
  <Section title="Initial Match Status">
    <div className="grid gap-sm md:grid-cols-2 xl:grid-cols-4">
      {MATCH_STATUS.map(([value, text, icon]) => (
        <label key={value} className={`grid h-14 cursor-pointer place-items-center rounded-md border text-center transition ${selectedStatus === value ? "border-[#111827] bg-[#111827] text-white" : "border-outline-variant bg-white text-primary hover:border-primary"}`}>
          <input type="radio" value={value} {...register("status")} className="sr-only" />
          <span className="text-body-md font-extrabold">{icon}</span>
          <span className="text-label-data font-extrabold uppercase tracking-wide">{text}</span>
        </label>
      ))}
    </div>
  </Section>
);

export const AdvancedSection = ({ register }) => (
  <section className="rounded-md bg-[#f4f7ff] p-md">
    <h3 className="mb-md text-title-md font-extrabold text-on-surface">Advanced Configuration</h3>
    <SelectField name="tossResult" title="Toss Result (Pre-Match)" register={register} placeholder="Not Yet Determined" options={[{ value: "TEAM_1_WON", label: "Team 1 won the toss" }, { value: "TEAM_2_WON", label: "Team 2 won the toss" }]} />
  </section>
);
