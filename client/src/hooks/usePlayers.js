import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPlayer,
  deletePlayer,
  getPlayerById,
  getPlayers,
  updatePlayer,
} from "../api/player.api.js";

export const playerKeys = {
  all: ["players"],
  list: () => [...playerKeys.all, "list"],
  detail: (id) => [...playerKeys.all, "detail", id],
};

export const usePlayers = () =>
  useQuery({
    queryKey: playerKeys.list(),
    queryFn: async () => {
      const res = await getPlayers();
      return res.data?.data || [];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

export const usePlayer = (id) =>
  useQuery({
    queryKey: playerKeys.detail(id),
    queryFn: async () => {
      const res = await getPlayerById(id);
      return res.data?.data;
    },
    enabled: Boolean(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => (await createPlayer(data)).data?.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: playerKeys.all }),
  });
};

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => (await updatePlayer(id, data)).data?.data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: playerKeys.all });
      queryClient.invalidateQueries({ queryKey: playerKeys.detail(variables.id) });
    },
  });
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await deletePlayer(id);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: playerKeys.all }),
  });
};
