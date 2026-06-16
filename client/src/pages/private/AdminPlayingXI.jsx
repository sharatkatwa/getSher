import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import PageHeader from "../../components/shared/PageHeader";
import StatusPill from "../../components/shared/StatusPill";
import { useMatch, useTeamSquad, useUpdatePlayingXI } from "../../hooks/useMatch";
import {
  EMPTY_LINEUP,
  getApiError,
  getId,
  getLineupError,
  getTeamName,
  toLineup,
} from "../../utils/match/matchUtils";

const PlayerOption = ({
  player,
  index,
  checked,
  disabled,
  isCaptain,
  isWicketKeeper,
  onToggle,
  onCaptain,
  onWicketKeeper,
}) => (
  <div className={`flex flex-col gap-sm rounded-md border px-md py-sm sm:flex-row sm:items-center sm:justify-between ${
    checked
      ? "border-primary bg-primary-container/30"
      : "border-outline-variant bg-surface-container-lowest"
  }`}>
    <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-sm">
      <input
        checked={checked}
        className="size-4 accent-primary disabled:cursor-not-allowed"
        disabled={disabled}
        onChange={onToggle}
        type="checkbox"
      />
      <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-primary-container text-label-data font-bold text-primary">
        {index + 1}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-body-md font-bold text-on-surface">{player.name}</span>
        <span className="block text-body-sm text-on-surface-variant">{player.role || "Player"}</span>
      </span>
    </label>

    <div className="flex gap-xs">
      <button type="button" disabled={!checked} onClick={onCaptain} className={`h-8 rounded-md px-sm text-label-data font-extrabold transition disabled:cursor-not-allowed disabled:opacity-40 ${isCaptain ? "bg-primary text-on-primary" : "border border-outline-variant bg-white text-primary hover:bg-surface-container"}`}>
        Captain
      </button>
      <button type="button" disabled={!checked} onClick={onWicketKeeper} className={`h-8 rounded-md px-sm text-label-data font-extrabold transition disabled:cursor-not-allowed disabled:opacity-40 ${isWicketKeeper ? "bg-primary text-on-primary" : "border border-outline-variant bg-white text-primary hover:bg-surface-container"}`}>
        WK
      </button>
    </div>
  </div>
);

const TeamLineup = ({ title, squad, value, onChange, disabled = false }) => {
  const selectedSet = useMemo(() => new Set(value.selected), [value.selected]);
  const lineupError = getLineupError(value, title);
  const isComplete = !lineupError;

  const togglePlayer = (playerId) => {
    if (disabled) return;

    const isSelected = selectedSet.has(playerId);
    if (!isSelected && value.selected.length >= 11) return;

    const selected = isSelected
      ? value.selected.filter((id) => id !== playerId)
      : [...value.selected, playerId];

    onChange({
      selected,
      captain: isSelected && value.captain === playerId ? "" : value.captain,
      wicketKeeper: isSelected && value.wicketKeeper === playerId ? "" : value.wicketKeeper,
    });
  };

  const setCaptain = (playerId) => {
    if (!disabled) onChange({ ...value, captain: playerId });
  };
  const setWicketKeeper = (playerId) => {
    if (!disabled) onChange({ ...value, wicketKeeper: playerId });
  };

  return (
    <div className="space-y-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-body-md font-extrabold text-primary">{title}</h3>
        <StatusPill tone={value.selected.length === 11 ? "upcoming" : "neutral"}>
          {value.selected.length}/11
        </StatusPill>
      </div>

      <div className={`rounded-md border p-sm text-body-sm font-semibold ${
        isComplete
          ? "border-primary bg-primary-container/30 text-primary"
          : "border-outline-variant bg-surface-container-lowest text-on-surface-variant"
      }`}>
        {isComplete ? "Ready with 11 players, captain, and wicketkeeper." : lineupError}
      </div>

      {squad.length ? (
        squad.map((player, index) => {
          const playerId = getId(player);
          const checked = selectedSet.has(playerId);
          const selectionLocked = disabled || (!checked && value.selected.length >= 11);

          return (
            <PlayerOption
              checked={checked}
              disabled={selectionLocked}
              index={index}
              isCaptain={value.captain === playerId}
              isWicketKeeper={value.wicketKeeper === playerId}
              key={playerId}
              onCaptain={() => setCaptain(playerId)}
              onToggle={() => togglePlayer(playerId)}
              onWicketKeeper={() => setWicketKeeper(playerId)}
              player={player}
            />
          );
        })
      ) : (
        <div className="rounded-md border border-outline-variant bg-surface-container-lowest p-md text-body-md font-semibold text-on-surface-variant">
          No squad players found for this team.
        </div>
      )}
    </div>
  );
};

const AdminPlayingXI = () => {
  const { matchId } = useParams();
  const [team1Lineup, setTeam1Lineup] = useState(EMPTY_LINEUP);
  const [team2Lineup, setTeam2Lineup] = useState(EMPTY_LINEUP);

  const matchQuery = useMatch(matchId);

  const match = matchQuery.data?.data;
  const team1Id = getId(match?.team1);
  const team2Id = getId(match?.team2);

  const team1SquadQuery = useTeamSquad(team1Id);
  const team2SquadQuery = useTeamSquad(team2Id);

  useEffect(() => {
    if (!match?.playingXI) return;

    setTeam1Lineup(toLineup(match.playingXI.team1));
    setTeam2Lineup(toLineup(match.playingXI.team2));
  }, [match]);

  const mutation = useUpdatePlayingXI(matchId, team1Lineup, team2Lineup);

  const team1Error = getLineupError(team1Lineup, getTeamName(match?.team1, "Team 1"));
  const team2Error = getLineupError(team2Lineup, getTeamName(match?.team2, "Team 2"));
  const matchLocked = match?.status && match.status !== "UPCOMING";
  const saveDisabled = mutation.isPending || matchLocked || !!team1Error || !!team2Error;

  const saveLineup = () => {
    const error = matchLocked
      ? "Playing XI can only be saved for upcoming matches."
      : team1Error || team2Error;

    if (error) {
      mutation.reset();
      window.alert(error);
      return;
    }

    mutation.mutate();
  };

  const loading = matchQuery.isLoading || team1SquadQuery.isLoading || team2SquadQuery.isLoading;
  const loadError = matchQuery.error || team1SquadQuery.error || team2SquadQuery.error;
  const team1Squad = team1SquadQuery.data?.data?.squadPlayers || [];
  const team2Squad = team2SquadQuery.data?.data?.squadPlayers || [];

  if (!matchId) {
    return <div className="px-md py-lg text-body-md font-semibold text-error">Missing match id.</div>;
  }

  if (loading) {
    return <div className="px-md py-lg text-body-md font-semibold text-primary">Loading playing XI...</div>;
  }

  if (loadError) {
    return <div className="px-md py-lg text-body-md font-semibold text-error">{getApiError(loadError)}</div>;
  }

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={
          <button
            className={`h-10 rounded-md px-md text-body-sm font-extrabold transition ${
              saveDisabled
                ? "cursor-not-allowed border border-outline-variant bg-surface-container-lowest text-on-surface-variant"
                : "bg-primary text-on-primary hover:brightness-110"
            }`}
            disabled={saveDisabled}
            onClick={saveLineup}
            type="button"
          >
            {mutation.isPending ? "Saving..." : "Save Playing XI"}
          </button>
        }
        description="Select final elevens, captains, and wicketkeepers for an upcoming match."
        eyebrow="Lineups"
        title="Playing XI"
      />

      <section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card">
        <div className="flex flex-col gap-sm border-b border-outline-variant pb-md sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-title-md font-extrabold text-primary">
              {getTeamName(match?.team1, "Team 1")} vs {getTeamName(match?.team2, "Team 2")}
            </h2>
            <p className="text-body-sm text-on-surface-variant">{match?.venue || "Venue TBD"}</p>
          </div>
          <StatusPill tone="upcoming">{match?.status || "UPCOMING"}</StatusPill>
        </div>

        {matchLocked && (
          <div className="mt-md rounded-md border border-outline-variant bg-surface-container p-md text-body-md font-semibold text-on-surface-variant">
            This match is {match.status}. Playing XI can only be edited before the match starts.
          </div>
        )}

        {mutation.error && (
          <div className="mt-md rounded-md border border-error bg-red-50 p-md text-body-md font-semibold text-error">
            {getApiError(mutation.error)}
          </div>
        )}

        <div className="mt-md grid gap-md xl:grid-cols-2">
          <TeamLineup
            disabled={matchLocked}
            onChange={setTeam1Lineup}
            squad={team1Squad}
            title={`${getTeamName(match?.team1, "Team 1")} XI`}
            value={team1Lineup}
          />
          <TeamLineup
            disabled={matchLocked}
            onChange={setTeam2Lineup}
            squad={team2Squad}
            title={`${getTeamName(match?.team2, "Team 2")} XI`}
            value={team2Lineup}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminPlayingXI;
