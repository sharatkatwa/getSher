import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createMatch,
  deleteMatch,
  getMatchById,
  getMatches,
  getMatchesBySeries,
  getMatchesByStatus,
  getMatchesByTeam,
  updateMatch,
  updatePlayingXI,
} from "../api/match.api.js";

export const matchKeys = {
  all: ["matches"],
  list: (params) => [...matchKeys.all, "list", params || {}],
  detail: (id) => [...matchKeys.all, "detail", id],
  status: (status, params) => [...matchKeys.all, "status", status, params || {}],
  series: (seriesId) => [...matchKeys.all, "series", seriesId],
  team: (teamId) => [...matchKeys.all, "team", teamId],
};

export const useMatches = (params) =>
  useQuery({
    queryKey: matchKeys.list(params),
    queryFn: async () => (await getMatches(params)).data?.data,
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useMatch = (id) =>
  useQuery({
    queryKey: matchKeys.detail(id),
    queryFn: async () => (await getMatchById(id)).data?.data,
    enabled: Boolean(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useMatchesByStatus = (status, params) =>
  useQuery({
    queryKey: matchKeys.status(status, params),
    queryFn: async () => (await getMatchesByStatus(status, params)).data?.data,
    enabled: Boolean(status),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useMatchesBySeries = (seriesId) =>
  useQuery({
    queryKey: matchKeys.series(seriesId),
    queryFn: async () => (await getMatchesBySeries(seriesId)).data?.data || [],
    enabled: Boolean(seriesId),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useMatchesByTeam = (teamId) =>
  useQuery({
    queryKey: matchKeys.team(teamId),
    queryFn: async () => (await getMatchesByTeam(teamId)).data?.data || [],
    enabled: Boolean(teamId),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useCreateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => (await createMatch(data)).data?.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: matchKeys.all }),
  });
};

export const useUpdateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => (await updateMatch(id, data)).data?.data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: matchKeys.all });
      queryClient.invalidateQueries({ queryKey: matchKeys.detail(variables.id) });
    },
  });
};

export const useUpdatePlayingXI = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => (await updatePlayingXI(id, data)).data?.data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: matchKeys.all });
      queryClient.invalidateQueries({ queryKey: matchKeys.detail(variables.id) });
    },
  });
};

export const useDeleteMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await deleteMatch(id);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: matchKeys.all }),
  });
};
