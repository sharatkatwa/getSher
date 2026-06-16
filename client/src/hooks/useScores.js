import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createScore, getScoresByMatch, updateScore } from "../api/score.api.js";
import { matchKeys } from "./useMatches.js";

export const scoreKeys = {
  all: ["scores"],
  match: (matchId) => [...scoreKeys.all, "match", matchId],
};

export const useScoresByMatch = (matchId) =>
  useQuery({
    queryKey: scoreKeys.match(matchId),
    queryFn: async () => (await getScoresByMatch(matchId)).data?.data || [],
    enabled: Boolean(matchId),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useCreateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => (await createScore(data)).data?.data,
    onSuccess: (score) => {
      const matchId = score?.matchId?._id || score?.matchId;

      queryClient.invalidateQueries({ queryKey: scoreKeys.all });
      queryClient.invalidateQueries({ queryKey: matchKeys.detail(matchId) });
    },
  });
};

export const useUpdateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => (await updateScore(id, data)).data?.data,
    onSuccess: (score) => {
      const matchId = score?.matchId?._id || score?.matchId;

      queryClient.invalidateQueries({ queryKey: scoreKeys.all });
      queryClient.invalidateQueries({ queryKey: matchKeys.detail(matchId) });
    },
  });
};
