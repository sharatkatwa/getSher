import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe, loginUser, logoutUser, registerUser } from "../api/auth.api.js";

export const authKeys = {
  all: ["auth"],
  me: () => [...authKeys.all, "me"],
};

export const useMe = (options = {}) =>
  useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const res = await getMe();
      return res.data?.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await loginUser(data);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await registerUser(data);
      return res.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await logoutUser();
      return res.data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
};
