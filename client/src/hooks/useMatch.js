import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { getSeries } from "../api/seriesApi";
import { getTeamSquad, getTeams } from "../api/teamApi";
import {
  createMatch,
  deleteMatch,
  getMatchById,
  getMatches,
  updateMatch,
  updatePlayingXI,
} from "../api/matchApi";
import { setMatches } from "../slices/matchSlice";
import { buildLineupPayload } from "../utils/match/matchUtils";

export const matchKeys = {
  all: ["matches"],
  list: () => matchKeys.all,
  detail: (id) => ["match", id],
  teamSquad: (id) => ["team-squad", id],
};

export const useMatches = () => {
  const dispatch = useDispatch();
  const matchesQuery = useQuery({
    queryKey: matchKeys.list(),
    queryFn: getMatches,
  });

  useEffect(() => {
    if (matchesQuery.data?.data?.matches) {
      dispatch(setMatches(matchesQuery.data.data.matches));
    }
  }, [matchesQuery.data, dispatch]);

  return matchesQuery;
};

export const useMatch = (matchId, options = {}) =>
  useQuery({
    queryKey: matchKeys.detail(matchId),
    queryFn: () => getMatchById(matchId),
    enabled: !!matchId && (options.enabled ?? true),
  });

export const useMatchFormQueries = ({ matchId, isEdit }) => {
  const teamsQuery = useQuery({ queryKey: ["teams"], queryFn: getTeams });
  const seriesQuery = useQuery({ queryKey: ["series"], queryFn: getSeries });
  const matchQuery = useMatch(matchId, { enabled: isEdit });

  return {
    teamsQuery,
    seriesQuery,
    matchQuery,
    loading: teamsQuery.isLoading || seriesQuery.isLoading || matchQuery.isLoading,
    loadError: teamsQuery.error || seriesQuery.error || matchQuery.error,
  };
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchKeys.list() });
      navigate("/admin/matches");
    },
  });
};

export const useUpdateMatch = (matchId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => updateMatch(matchId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchKeys.list() });
      queryClient.invalidateQueries({ queryKey: matchKeys.detail(matchId) });
      navigate("/admin/matches");
    },
  });
};

export const useDeleteMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchKeys.list() });
    },
  });
};

export const useTeamSquad = (teamId) =>
  useQuery({
    queryKey: matchKeys.teamSquad(teamId),
    queryFn: () => getTeamSquad(teamId),
    enabled: !!teamId,
  });

export const useUpdatePlayingXI = (matchId, team1Lineup, team2Lineup) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () =>
      updatePlayingXI(matchId, {
        team1: buildLineupPayload(team1Lineup),
        team2: buildLineupPayload(team2Lineup),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchKeys.detail(matchId) });
      queryClient.invalidateQueries({ queryKey: matchKeys.list() });
      navigate("/admin/matches");
    },
  });
};
