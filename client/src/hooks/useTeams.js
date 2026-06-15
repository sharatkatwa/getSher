import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAllteams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../api/team.api.js";

import {
  setTeams,
  addTeam,
  editTeam,
  removeTeam,
  setSelectedTeam,
  clearSelectedTeam,
} from "../slices/teamSlice.js";

export const teamKeys = {
  all: ["teams"],
  list: () => [...teamKeys.all, "list"],
  detail: (id) => [...teamKeys.all, "detail", id],
};

export const useTeams = () => {
  const dispatch = useDispatch();

  // TanStack Query owns the server request and cache for the team list.
  const teamsQuery = useQuery({
    queryKey: teamKeys.list(),
    queryFn: async () => {
      const res = await getAllteams();
      return res.data?.data || [];
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Keep Redux synced only for components that need team state outside Query.
  useEffect(() => {
    if (teamsQuery.data) {
      dispatch(setTeams(teamsQuery.data));
    }
  }, [teamsQuery.data, dispatch]);

  // Store the team currently being viewed, edited, or deleted.
  const selectTeam = (team) => {
    dispatch(setSelectedTeam(team));
  };

  const clearTeam = () => {
    dispatch(clearSelectedTeam());
  };

  return {
    ...teamsQuery,
    teams: teamsQuery.data || [],
    selectTeam,
    clearTeam,
  };
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Mutations change backend data, then refresh the team query cache.
  return useMutation({
    mutationFn: async (teamData) => {
      const res = await createTeam(teamData);
      return res.data?.data;
    },
    onSuccess: (newTeam) => {
      dispatch(addTeam(newTeam));
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Accept both the team id and updated form data from the component.
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await updateTeam(id, data);
      return res.data?.data;
    },
    onSuccess: (updatedTeam, variables) => {
      dispatch(editTeam(updatedTeam));

      queryClient.invalidateQueries({ queryKey: teamKeys.all });
      queryClient.invalidateQueries({
        queryKey: teamKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Return the deleted id so Redux can remove the same team locally.
  return useMutation({
    mutationFn: async (id) => {
      await deleteTeam(id);
      return id;
    },
    onSuccess: (id) => {
      dispatch(removeTeam(id));
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
};
