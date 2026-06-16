import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMatches } from "../../api/matchApi";
import TeamBadge from "../../components/home/TeamBadge";
import Icon from "../../components/shared/Icon";
import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";

const toneByStatus = {
  LIVE: "live",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
  ABANDONED: "neutral",
};

const getTeamLabel = (team, fallback) => team?.shortName || team?.name || fallback;
const getTeamName = (team, fallback) => team?.name || team?.shortName || fallback;

const formatStartTime = (value) => {
  if (!value) return "Time TBD";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const getMatchState = (match) => {
  if (match.status === "LIVE") return match.result || "Match in progress";
  if (match.status === "COMPLETED") return match.result || "Result pending";
  if (match.status === "ABANDONED") return match.result || "Match abandoned";
  return match.playingXI?.team1?.length || match.playingXI?.team2?.length
    ? "Playing XI announced"
    : "Toss pending";
};

const getPlayerName = (item) => item?.player?.name || "Player";
const getPlayerRole = (item) => item?.player?.role || "Player";

const PlayerLine = ({ item }) => (
  <li className="flex min-w-0 items-center justify-between gap-sm rounded-sm bg-surface-container px-sm py-xs">
    <span className="min-w-0 truncate text-body-sm font-semibold text-on-surface">
      {getPlayerName(item)}
      {item.isCaptain && <span className="ml-xs text-primary">(C)</span>}
      {item.isWicketKeeper && <span className="ml-xs text-primary">(WK)</span>}
    </span>
    <span className="shrink-0 text-label-data text-on-surface-variant">{getPlayerRole(item)}</span>
  </li>
);

const TeamPlayingXI = ({ title, players = [] }) => (
  <div>
    <h3 className="mb-sm text-label-data font-extrabold uppercase text-primary">{title}</h3>
    <ul className="grid gap-xs">
      {players.map((item) => (
        <PlayerLine item={item} key={item.player?._id || item.player || getPlayerName(item)} />
      ))}
    </ul>
  </div>
);

const PlayingXI = ({ match }) => {
  const team1Players = match.playingXI?.team1 || [];
  const team2Players = match.playingXI?.team2 || [];
  const hasPlayingXI = team1Players.length > 0 || team2Players.length > 0;

  if (!hasPlayingXI) {
    return (
      <div className="mt-md rounded-md border border-outline-variant bg-surface-container p-md text-body-sm font-semibold text-on-surface-variant">
        Playing XI not announced
      </div>
    );
  }

  return (
    <div className="mt-md grid gap-md border-t border-outline-variant pt-md lg:grid-cols-2">
      <TeamPlayingXI title={`${getTeamName(match.team1, "Team 1")} Playing XI`} players={team1Players} />
      <TeamPlayingXI title={`${getTeamName(match.team2, "Team 2")} Playing XI`} players={team2Players} />
    </div>
  );
};

const Matches = () => {
  const [expandedMatchIds, setExpandedMatchIds] = useState([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  const matches = data?.data?.matches || [];
  const liveCount = matches.filter((match) => match.status === "LIVE").length;
  const upcomingCount = matches.filter((match) => match.status === "UPCOMING").length;

  const togglePlayingXI = (matchId) => {
    setExpandedMatchIds((currentIds) =>
      currentIds.includes(matchId)
        ? currentIds.filter((id) => id !== matchId)
        : [...currentIds, matchId],
    );
  };

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={
          <div className="flex gap-xs">
            <StatusPill tone="live">Live {liveCount}</StatusPill>
            <StatusPill tone="upcoming">Upcoming {upcomingCount}</StatusPill>
          </div>
        }
        description="Match center listing live, upcoming, and completed fixtures with key scorer context."
        eyebrow="Fixtures"
        title="Matches"
      />

      {isLoading && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md font-semibold text-primary shadow-card">
          Loading matches...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-error bg-red-50 p-md text-body-md font-semibold text-error shadow-card">
          Failed to load matches. Please try again.
        </div>
      )}

      {!isLoading && !error && matches.length === 0 && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-md font-semibold text-on-surface-variant shadow-card">
          No matches found.
        </div>
      )}

      <div className="grid gap-md">
        {matches.map((match) => {
          const isPlayingXIExpanded = expandedMatchIds.includes(match._id);

          return (
            <article
              className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card transition hover:border-primary"
              key={match._id}
            >
              <div className="grid gap-md lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="flex items-start gap-md">
                  <div className="flex -space-x-sm">
                    <TeamBadge code={getTeamLabel(match.team1, "T1")} />
                    <TeamBadge code={getTeamLabel(match.team2, "T2")} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-sm">
                      <h2 className="text-title-md font-extrabold text-on-surface">
                        {getTeamName(match.team1, "Team 1")} vs {getTeamName(match.team2, "Team 2")}
                      </h2>
                      <StatusPill tone={toneByStatus[match.status] || "neutral"}>
                        {match.status || "UNKNOWN"}
                      </StatusPill>
                    </div>

                    <p className="mt-xs text-body-sm font-semibold text-primary">
                      {match.seriesId?.name || "Series TBD"}
                    </p>
                    <p className="mt-xs flex items-center gap-xs text-body-sm text-on-surface-variant">
                      <Icon name="calendar" className="h-4 w-4 text-primary" />
                      {formatStartTime(match.startTime)}
                    </p>
                    <p className="mt-xs text-body-sm text-on-surface-variant">
                      {match.venue || "Venue TBD"}
                    </p>
                  </div>
                </div>

                <div className="rounded-md bg-surface-container p-md lg:w-72">
                  <p className="text-label-data text-on-surface-variant">Current State</p>
                  <p className="mt-xs text-body-md font-extrabold text-primary">{getMatchState(match)}</p>
                </div>
              </div>

              <button
                aria-expanded={isPlayingXIExpanded}
                className="mt-md flex w-full items-center justify-between rounded-md border border-outline-variant bg-surface-container px-md py-sm text-left text-body-sm font-extrabold text-primary transition hover:border-primary"
                onClick={() => togglePlayingXI(match._id)}
                type="button"
              >
                <span>View Team Lineups</span>
                <Icon
                  name={isPlayingXIExpanded ? "chevron-up" : "chevron-down"}
                  className="h-4 w-4"
                />
              </button>

              {isPlayingXIExpanded && <PlayingXI match={match} />}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Matches;
