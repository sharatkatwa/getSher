import { useMemo } from "react";

import { useHome, useHomeSocket } from "../../hooks/useHome";
import Commentary from "./Commentary";
import LiveMatches from "./LiveMatches";
import RightRail from "./RightRail";

const HomeDashboard = () => {
  const { data, isError, isLoading } = useHome();
  const liveMatches = useMemo(() => data?.liveMatches || [], [data?.liveMatches]);
  const liveMatchIds = useMemo(
    () => liveMatches.map((match) => match._id).filter(Boolean),
    [liveMatches],
  );

  useHomeSocket(liveMatchIds);

  return (
    <div className="space-y-xl px-md py-lg lg:px-lg">
      {isLoading && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md text-on-surface-variant">
          Loading home feed...
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-error bg-error-container p-md text-body-md font-bold text-on-error-container">
          Failed to load home feed.
        </div>
      )}

      <LiveMatches matches={liveMatches} />

      <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_16rem]">
        <Commentary match={liveMatches[0]} />
        <RightRail
          recentMatches={data?.recentMatches || []}
          upcomingMatches={data?.upcomingMatches || []}
        />
      </div>
    </div>
  );
};

export default HomeDashboard;
