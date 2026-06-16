export const DEFAULT_MATCH_VALUES = {
  seriesId: "",
  team1Id: "",
  team2Id: "",
  matchType: "T20",
  status: "UPCOMING",
  venue: "",
  matchDate: "",
  startTime: "",
  tossResult: "",
};

export const EMPTY_LINEUP = {
  selected: [],
  captain: "",
  wicketKeeper: "",
};

export const getId = (value) => {
  if (!value) return "";
  return typeof value === "string" ? value : value._id || value.id || "";
};

export const getTeamName = (team, fallback) => team?.name || team?.shortName || fallback;

const toDateInput = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const toTimeInput = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(11, 16);
};

const toTossResult = (match) => {
  const tossWinner = getId(match.tossWinner);
  if (!tossWinner) return "";
  if (tossWinner === getId(match.team1Id || match.team1)) return "TEAM_1_WON";
  if (tossWinner === getId(match.team2Id || match.team2)) return "TEAM_2_WON";
  return "";
};

export const getApiError = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";

export const toOptions = (items = []) =>
  items.map((item) => ({ value: item._id, label: item.name }));

export const toFormValues = (match) => ({
  seriesId: getId(match.seriesId),
  team1Id: getId(match.team1Id || match.team1),
  team2Id: getId(match.team2Id || match.team2),
  matchType: match.matchType || "T20",
  status: match.status || "UPCOMING",
  venue: match.venue || "",
  matchDate: toDateInput(match.startTime),
  startTime: toTimeInput(match.startTime),
  tossResult: toTossResult(match),
});

export const toMatchPayload = (data, isEdit) => {
  const payload = {
    seriesId: data.seriesId,
    team1: data.team1Id,
    team2: data.team2Id,
    venue: data.venue,
    startTime: `${data.matchDate}T${data.startTime}:00.000Z`,
  };

  if (data.tossResult === "TEAM_1_WON") payload.tossWinner = data.team1Id;
  if (data.tossResult === "TEAM_2_WON") payload.tossWinner = data.team2Id;
  if (isEdit) payload.status = data.status;

  return payload;
};

export const toLineup = (players = []) => ({
  selected: players.map((item) => getId(item.player)),
  captain: getId(players.find((item) => item.isCaptain)?.player),
  wicketKeeper: getId(players.find((item) => item.isWicketKeeper)?.player),
});

export const buildLineupPayload = ({ selected, captain, wicketKeeper }) =>
  selected.map((playerId) => ({
    player: playerId,
    isCaptain: playerId === captain,
    isWicketKeeper: playerId === wicketKeeper,
  }));

export const getLineupError = (lineup, label) => {
  if (lineup.selected.length !== 11) return `${label} needs exactly 11 selected players.`;
  if (!lineup.captain) return `${label} needs 1 captain.`;
  if (!lineup.wicketKeeper) return `${label} needs 1 wicketkeeper.`;
  return "";
};
