import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createSeries,
  deleteSeries,
  getSeries,
  getSeriesById,
  updateSeries,
} from "../api/series.api.js";

export const seriesKeys = {
  all: ["series"],
  list: () => [...seriesKeys.all, "list"],
  detail: (id) => [...seriesKeys.all, "detail", id],
};

export const useSeries = () =>
  useQuery({
    queryKey: seriesKeys.list(),
    queryFn: async () => (await getSeries()).data?.data || [],
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useSeriesDetails = (id) =>
  useQuery({
    queryKey: seriesKeys.detail(id),
    queryFn: async () => (await getSeriesById(id)).data?.data,
    enabled: Boolean(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useCreateSeries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => (await createSeries(data)).data?.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: seriesKeys.all }),
  });
};

export const useUpdateSeries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => (await updateSeries(id, data)).data?.data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: seriesKeys.all });
      queryClient.invalidateQueries({ queryKey: seriesKeys.detail(variables.id) });
    },
  });
};

export const useDeleteSeries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await deleteSeries(id);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: seriesKeys.all }),
  });
};
