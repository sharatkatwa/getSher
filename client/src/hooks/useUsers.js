import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteUser, getUserById, getUsers, updateUser } from "../api/user.api.js";

export const userKeys = {
  all: ["users"],
  list: () => [...userKeys.all, "list"],
  detail: (id) => [...userKeys.all, "detail", id],
};

export const useUsers = () =>
  useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => (await getUsers()).data?.data || [],
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useUser = (id) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => (await getUserById(id)).data?.data,
    enabled: Boolean(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => (await updateUser(id, data)).data?.data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await deleteUser(id);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};
