import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCommentary,
  deleteCommentary,
  getCommentaryByMatch,
} from "../api/commentary.api.js";

export const commentaryKeys = {
  all: ["commentary"],
  match: (matchId) => [...commentaryKeys.all, "match", matchId],
};

export const useCommentaryByMatch = (matchId) =>
  useQuery({
    queryKey: commentaryKeys.match(matchId),
    queryFn: async () => (await getCommentaryByMatch(matchId)).data?.data || [],
    enabled: Boolean(matchId),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useCreateCommentary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => (await createCommentary(data)).data?.data,
    onSuccess: (commentary) => {
      const matchId = commentary?.matchId?._id || commentary?.matchId;

      queryClient.invalidateQueries({
        queryKey: commentaryKeys.match(matchId),
      });
    },
  });
};

export const useDeleteCommentary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => (await deleteCommentary(id)).data?.data,
    onSuccess: (commentary) => {
      const matchId = commentary?.matchId?._id || commentary?.matchId;

      queryClient.invalidateQueries({
        queryKey: commentaryKeys.match(matchId),
      });
    },
  });
};
