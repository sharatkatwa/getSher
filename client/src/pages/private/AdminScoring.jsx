import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import AdminActionButton from "../../components/admin/AdminActionButton";
import PageHeader from "../../components/shared/PageHeader";
import StatBadge from "../../components/shared/StatBadge";
import StatusPill from "../../components/shared/StatusPill";
import {
  useCreateCommentary,
  useCommentaryByMatch,
} from "../../hooks/useCommentary";
import { useMatches } from "../../hooks/useMatches";
import { useCreateScore, useScoresByMatch, useUpdateScore } from "../../hooks/useScores";
import { useMatchSocket } from "../../hooks/useMatchSocket";

const scoreButtons = ["0", "1", "2", "3", "4", "6", "WD", "NB", "W"];
const commentaryTypes = ["NORMAL", "FOUR", "SIX", "WICKET", "MILESTONE"];

const getId = (value) => value?._id || value || "";
const getTeamName = (team) => team?.name || team?.shortName || "Team";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.docs)) return data.docs;
  if (Array.isArray(data?.matches)) return data.matches;
  return [];
};

const oversToBalls = (overs = "0.0") => {
  const [overCount = "0", ballCount = "0"] = String(overs).split(".");
  return Number(overCount) * 6 + Number(ballCount);
};

const ballsToOvers = (balls) => {
  const safeBalls = Math.max(Number(balls) || 0, 0);
  return `${Math.floor(safeBalls / 6)}.${safeBalls % 6}`;
};

const calculateRunRate = (runs, overs) => {
  const balls = oversToBalls(overs);
  if (!balls) return "0.00";
  return (Number(runs || 0) / (balls / 6)).toFixed(2);
};

const buildMatchTitle = (match) => {
  if (!match) return "Select a live match";
  return `${getTeamName(match.team1)} vs ${getTeamName(match.team2)}`;
};

const getTone = (type) => {
  if (type === "WICKET") return "live";
  if (type === "FOUR" || type === "SIX") return "primary";
  return "neutral";
};

const AdminScoring = () => {
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [selectedInnings, setSelectedInnings] = useState(1);
  const [notice, setNotice] = useState("");

  const { data: matchesData, isLoading: isMatchesLoading } = useMatches();
  const matches = useMemo(() => normalizeList(matchesData), [matchesData]);
  const liveMatches = useMemo(
    () => matches.filter((match) => match.status === "LIVE"),
    [matches],
  );

  const selectedMatch = useMemo(
    () => matches.find((match) => getId(match) === selectedMatchId),
    [matches, selectedMatchId],
  );

  const { data: scores = [], isLoading: isScoresLoading } =
    useScoresByMatch(selectedMatchId);
  const { data: commentary = [], isLoading: isCommentaryLoading } =
    useCommentaryByMatch(selectedMatchId);

  useMatchSocket(selectedMatchId);

  const scoreForm = useForm({
    defaultValues: {
      battingTeam: "",
      score: 0,
      wickets: 0,
      overs: "0.0",
      runRate: 0,
      target: "",
    },
  });

  const commentaryForm = useForm({
    defaultValues: {
      over: "",
      ball: "",
      type: "NORMAL",
      text: "",
    },
  });

  const createScoreMutation = useCreateScore();
  const updateScoreMutation = useUpdateScore();
  const createCommentaryMutation = useCreateCommentary();

  const currentScore = useMemo(
    () => scores.find((score) => Number(score.innings) === Number(selectedInnings)),
    [scores, selectedInnings],
  );

  const teamOptions = useMemo(() => {
    if (!selectedMatch) return [];
    return [selectedMatch.team1, selectedMatch.team2].filter(Boolean);
  }, [selectedMatch]);

  useEffect(() => {
    if (!selectedMatchId && liveMatches.length > 0) {
      setSelectedMatchId(getId(liveMatches[0]));
    }
  }, [liveMatches, selectedMatchId]);

  useEffect(() => {
    const fallbackTeam = getId(teamOptions[0]);

    scoreForm.reset({
      battingTeam: getId(currentScore?.battingTeam) || fallbackTeam,
      score: currentScore?.score || 0,
      wickets: currentScore?.wickets || 0,
      overs: currentScore?.overs || "0.0",
      runRate: currentScore?.runRate || 0,
      target: currentScore?.target ?? "",
    });
  }, [currentScore, scoreForm, teamOptions]);

  useEffect(() => {
    setNotice("");
  }, [selectedMatchId, selectedInnings]);

  const applyBallUpdate = (buttonValue) => {
    const runs = Number(scoreForm.getValues("score") || 0);
    const wickets = Number(scoreForm.getValues("wickets") || 0);
    const overs = scoreForm.getValues("overs") || "0.0";
    const currentBalls = oversToBalls(overs);

    let nextRuns = runs;
    let nextWickets = wickets;
    let nextBalls = currentBalls;
    let nextType = "NORMAL";

    if (buttonValue === "W") {
      nextWickets = Math.min(wickets + 1, 10);
      nextBalls += 1;
      nextType = "WICKET";
    } else if (buttonValue === "WD" || buttonValue === "NB") {
      nextRuns += 1;
    } else {
      const runValue = Number(buttonValue);
      nextRuns += runValue;
      nextBalls += 1;
      if (runValue === 4) nextType = "FOUR";
      if (runValue === 6) nextType = "SIX";
    }

    const nextOvers = ballsToOvers(nextBalls);

    scoreForm.setValue("score", nextRuns, { shouldDirty: true });
    scoreForm.setValue("wickets", nextWickets, { shouldDirty: true });
    scoreForm.setValue("overs", nextOvers, { shouldDirty: true });
    scoreForm.setValue("runRate", calculateRunRate(nextRuns, nextOvers), {
      shouldDirty: true,
    });

    commentaryForm.setValue("over", Math.floor(nextBalls / 6), {
      shouldDirty: true,
    });
    commentaryForm.setValue("ball", Math.max(nextBalls % 6, 1), {
      shouldDirty: true,
    });
    commentaryForm.setValue("type", nextType, { shouldDirty: true });
  };

  const handleScoreSubmit = scoreForm.handleSubmit(async (values) => {
    if (!selectedMatchId) return;

    const payload = {
      battingTeam: values.battingTeam,
      score: Number(values.score || 0),
      wickets: Number(values.wickets || 0),
      overs: values.overs || "0.0",
      runRate: Number(values.runRate || 0),
    };

    if (values.target !== "" && values.target !== undefined) {
      payload.target = Number(values.target);
    }

    try {
      if (currentScore?._id) {
        await updateScoreMutation.mutateAsync({
          id: currentScore._id,
          data: payload,
        });
        setNotice("Score updated and emitted to live clients.");
      } else {
        await createScoreMutation.mutateAsync({
          ...payload,
          matchId: selectedMatchId,
          innings: Number(selectedInnings),
        });
        setNotice("Score created and emitted to live clients.");
      }
    } catch (error) {
      setNotice(error?.response?.data?.message || "Unable to save score.");
    }
  });

  const handleCommentarySubmit = commentaryForm.handleSubmit(async (values) => {
    if (!selectedMatchId) return;

    try {
      await createCommentaryMutation.mutateAsync({
        matchId: selectedMatchId,
        over: Number(values.over),
        ball: Number(values.ball),
        type: values.type,
        text: values.text,
      });
      commentaryForm.reset({
        over: "",
        ball: "",
        type: "NORMAL",
        text: "",
      });
      setNotice("Commentary published and emitted to live clients.");
    } catch (error) {
      setNotice(error?.response?.data?.message || "Unable to publish commentary.");
    }
  });

  const selectedBattingTeam = teamOptions.find(
    (team) => getId(team) === scoreForm.watch("battingTeam"),
  );
  const isSavingScore = createScoreMutation.isPending || updateScoreMutation.isPending;

  return (
    <div className="space-y-lg px-md py-lg lg:px-lg">
      <PageHeader
        action={<StatusPill tone="live">Live Scoring</StatusPill>}
        description="Update innings score, wickets, overs, and ball-by-ball commentary from one control surface."
        eyebrow="Scorer Desk"
        title="Live Score & Commentary"
      />

      {notice && (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md text-body-sm font-bold text-primary">
          {notice}
        </div>
      )}

      <section className="grid gap-md xl:grid-cols-[1.35fr_0.65fr]">
        <form
          className="space-y-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card"
          onSubmit={handleScoreSubmit}
        >
          <div className="flex flex-col gap-sm border-b border-outline-variant pb-md md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-label-caps text-live">Selected Match</p>
              <h2 className="text-title-md font-extrabold text-primary">
                {buildMatchTitle(selectedMatch)}
              </h2>
              <p className="text-body-sm text-on-surface-variant">
                {selectedMatch?.seriesId?.name || selectedMatch?.seriesId?.shortName || "Series"} -{" "}
                {selectedMatch?.venue || "Venue TBA"}
              </p>
            </div>
            <div className="grid gap-sm sm:grid-cols-2">
              <select
                className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm font-bold text-on-surface outline-none focus:border-primary"
                disabled={isMatchesLoading}
                onChange={(event) => setSelectedMatchId(event.target.value)}
                value={selectedMatchId}
              >
                <option value="">Select live match</option>
                {liveMatches.map((match) => (
                  <option key={getId(match)} value={getId(match)}>
                    {buildMatchTitle(match)}
                  </option>
                ))}
              </select>
              <select
                className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm font-bold text-on-surface outline-none focus:border-primary"
                onChange={(event) => setSelectedInnings(Number(event.target.value))}
                value={selectedInnings}
              >
                <option value={1}>Innings 1</option>
                <option value={2}>Innings 2</option>
              </select>
            </div>
          </div>

          <div className="grid gap-md md:grid-cols-4">
            <StatBadge
              label="Score"
              value={`${scoreForm.watch("score") || 0}/${scoreForm.watch("wickets") || 0}`}
            />
            <StatBadge label="Overs" value={scoreForm.watch("overs") || "0.0"} />
            <StatBadge label="Run Rate" value={scoreForm.watch("runRate") || "0.00"} />
            <StatBadge label="Innings" value={`${selectedInnings}`} />
          </div>

          <div className="grid gap-md lg:grid-cols-[1fr_1fr]">
            <div className="rounded-lg border border-outline-variant bg-surface p-md">
              <h3 className="text-body-md font-extrabold text-primary">Ball Update</h3>
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
                    disabled={!selectedMatchId}
                    key={item}
                    onClick={() => applyBallUpdate(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant bg-surface p-md">
              <h3 className="text-body-md font-extrabold text-primary">Manual Score</h3>
              <div className="mt-md grid grid-cols-2 gap-sm">
                <select
                  className="col-span-2 h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  {...scoreForm.register("battingTeam", { required: true })}
                >
                  <option value="">Select batting team</option>
                  {teamOptions.map((team) => (
                    <option key={getId(team)} value={getId(team)}>
                      {getTeamName(team)}
                    </option>
                  ))}
                </select>
                <input
                  className="h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  min="0"
                  placeholder="Runs"
                  type="number"
                  {...scoreForm.register("score", { required: true })}
                />
                <input
                  className="h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  max="10"
                  min="0"
                  placeholder="Wickets"
                  type="number"
                  {...scoreForm.register("wickets", { required: true })}
                />
                <input
                  className="h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  placeholder="Overs"
                  {...scoreForm.register("overs", { required: true })}
                />
                <input
                  className="h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  min="0"
                  placeholder="Run rate"
                  step="0.01"
                  type="number"
                  {...scoreForm.register("runRate", { required: true })}
                />
                <input
                  className="col-span-2 h-10 rounded-md border border-outline-variant bg-surface-container-lowest px-md text-body-sm outline-none focus:border-primary"
                  min="0"
                  placeholder="Target optional"
                  type="number"
                  {...scoreForm.register("target")}
                />
              </div>
              <div className="mt-md flex justify-end">
                <AdminActionButton type="submit">
                  {isSavingScore
                    ? "Saving..."
                    : currentScore?._id
                      ? "Update Score"
                      : "Create Score"}
                </AdminActionButton>
              </div>
            </div>
          </div>
        </form>

        <aside className="space-y-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card">
          <div>
            <p className="text-label-caps text-live">Current State</p>
            <h2 className="mt-xs text-title-md font-extrabold text-primary">
              {isScoresLoading ? "Loading score..." : buildMatchTitle(selectedMatch)}
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Updates save through the API, then the backend emits socket events.
            </p>
          </div>

          <div className="grid gap-sm">
            <StatBadge
              label="Batting Team"
              value={getTeamName(selectedBattingTeam) || "Select team"}
            />
            <StatBadge label="Target" value={scoreForm.watch("target") || "-"} />
            <StatBadge label="Status" value={selectedMatch?.status || "NO LIVE MATCH"} />
          </div>
        </aside>
      </section>

      <section className="grid gap-md xl:grid-cols-[0.85fr_1.15fr]">
        <form
          className="space-y-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md shadow-card"
          onSubmit={handleCommentarySubmit}
        >
          <div>
            <p className="text-label-caps text-live">Commentary</p>
            <h2 className="mt-xs text-title-md font-extrabold text-primary">
              Add Ball Commentary
            </h2>
          </div>

          <div className="grid gap-sm sm:grid-cols-3">
            <input
              className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary"
              min="0"
              placeholder="Over"
              type="number"
              {...commentaryForm.register("over", { required: true })}
            />
            <input
              className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary"
              max="6"
              min="1"
              placeholder="Ball"
              type="number"
              {...commentaryForm.register("ball", { required: true })}
            />
            <select
              className="h-10 rounded-md border border-outline-variant bg-surface px-md text-body-sm outline-none focus:border-primary"
              {...commentaryForm.register("type")}
            >
              {commentaryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="min-h-32 w-full resize-y rounded-md border border-outline-variant bg-surface px-md py-sm text-body-sm outline-none placeholder:text-on-surface-variant focus:border-primary"
            placeholder="Write commentary..."
            {...commentaryForm.register("text", { required: true })}
          />

          <div className="flex justify-end gap-sm">
            <AdminActionButton
              onClick={() =>
                commentaryForm.reset({
                  over: "",
                  ball: "",
                  type: "NORMAL",
                  text: "",
                })
              }
              variant="secondary"
            >
              Clear
            </AdminActionButton>
            <AdminActionButton type="submit">
              {createCommentaryMutation.isPending ? "Publishing..." : "Publish"}
            </AdminActionButton>
          </div>
        </form>

        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest shadow-card">
          <div className="flex items-center justify-between border-b border-outline-variant p-md">
            <h2 className="text-title-md font-extrabold text-primary">
              Recent Commentary
            </h2>
            <StatusPill tone="neutral">
              {isCommentaryLoading ? "Loading" : `${commentary.length} Items`}
            </StatusPill>
          </div>
          <div className="divide-y divide-outline-variant">
            {commentary.map((item) => (
              <article
                className="grid gap-sm p-md sm:grid-cols-[5rem_1fr_auto]"
                key={getId(item)}
              >
                <div>
                  <p className="text-body-md font-extrabold text-primary">
                    {item.over}.{item.ball}
                  </p>
                  <p className="text-label-data text-on-surface-variant">Over</p>
                </div>
                <div>
                  <StatusPill tone={getTone(item.type)}>{item.type}</StatusPill>
                  <p className="mt-xs text-body-sm text-on-surface">{item.text}</p>
                </div>
                <p className="text-label-data text-on-surface-variant">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </article>
            ))}

            {!isCommentaryLoading && commentary.length === 0 && (
              <p className="p-md text-body-sm text-on-surface-variant">
                No commentary has been published for this match yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminScoring;
