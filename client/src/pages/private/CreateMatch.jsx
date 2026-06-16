import MatchForm from "../../components/admin/MatchForm";

const CreateMatch = () => {
  return (
    <div className="min-h-screen bg-[#f6f7fc]">
      <div className="border-b border-outline-variant bg-surface-container-lowest px-lg py-sm">
        <h1 className="text-headline-md font-extrabold leading-tight text-on-surface">
          Match Creation
        </h1>
      </div>

      <main className="mx-auto max-w-[1120px] px-md py-lg">
        <div className="mb-md flex items-center gap-sm text-label-data font-extrabold tracking-wide text-on-surface-variant">
          <span>MATCHES</span>
          <span className="text-primary">&gt;</span>
          <span className="text-on-surface">CREATE NEW MATCH</span>
        </div>

        <MatchForm mode="create" />
      </main>
    </div>
  );
};

export default CreateMatch;
