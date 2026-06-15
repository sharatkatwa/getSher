import AdminActionButton from "../../components/admin/AdminActionButton";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";

const teamOne = ["Rohit Sharma", "Yashasvi Jaiswal", "Shubman Gill", "Virat Kohli", "Ravindra Jadeja", "KL Rahul"];
const teamTwo = ["Usman Khawaja", "Marnus Labuschagne", "Steve Smith", "Travis Head", "Alex Carey", "Pat Cummins"];

const PlayerSlot = ({ name, index }) => (
  <div className="flex items-center justify-between rounded-md border border-outline-variant bg-surface-container-lowest px-md py-sm">
    <div className="flex items-center gap-sm">
      <span className="grid size-8 place-items-center rounded-sm bg-primary-container text-label-data font-bold text-primary">
        {index + 1}
      </span>
      <p className="text-body-md font-bold text-on-surface">{name}</p>
    </div>
    {index === 0 && <StatusPill tone="primary">C</StatusPill>}
    {index === 4 && <StatusPill tone="neutral">AR</StatusPill>}
  </div>
);

const AdminPlayingXI = () => {
  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<AdminActionButton>Save Playing XI</AdminActionButton>}
        description="Static lineup builder preview for selecting captains, wicket keepers, and final elevens."
        eyebrow="Lineups"
        title="Playing XI"
      />

      <section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card">
        <div className="flex flex-col gap-sm border-b border-outline-variant pb-md sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-title-md font-extrabold text-primary">India vs Australia</h2>
            <p className="text-body-sm text-on-surface-variant">1st Test • Border-Gavaskar Trophy</p>
          </div>
          <StatusPill tone="live">Lineup Draft</StatusPill>
        </div>

        <div className="mt-md grid gap-md xl:grid-cols-2">
          <div className="space-y-sm">
            <h3 className="text-body-md font-extrabold text-primary">India XI</h3>
            {teamOne.map((player, index) => (
              <PlayerSlot index={index} key={player} name={player} />
            ))}
          </div>
          <div className="space-y-sm">
            <h3 className="text-body-md font-extrabold text-primary">Australia XI</h3>
            {teamTwo.map((player, index) => (
              <PlayerSlot index={index} key={player} name={player} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPlayingXI;
