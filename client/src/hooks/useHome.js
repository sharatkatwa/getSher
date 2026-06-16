import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getHomeFeed } from "../api/home.api.js";
import { socket } from "../lib/socket.js";
import { SOCKET_EVENTS } from "../sockets/socketEvents.js";
import { commentaryKeys } from "./useCommentary.js";

export const homeKeys = {
  all: ["home"],
  feed: () => [...homeKeys.all, "feed"],
};

export const useHome = () =>
  useQuery({
    queryKey: homeKeys.feed(),
    queryFn: async () => {
      const res = await getHomeFeed();
      return res.data?.data || {
        liveMatches: [],
        upcomingMatches: [],
        recentMatches: [],
      };
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useHomeSocket = (matchIds = []) => {
  const queryClient = useQueryClient();
  const roomKey = matchIds.filter(Boolean).sort().join("|");

  useEffect(() => {
    const roomIds = roomKey.split("|").filter(Boolean);

    if (roomIds.length === 0) return undefined;

    socket.connect();
    roomIds.forEach((matchId) => {
      socket.emit(SOCKET_EVENTS.JOIN_MATCH, matchId);
    });

    const refreshHomeFeed = () => {
      queryClient.invalidateQueries({ queryKey: homeKeys.feed() });
    };

    const refreshCommentary = (payload) => {
      const matchId = payload?.matchId?._id || payload?.matchId;

      refreshHomeFeed();

      if (matchId) {
        queryClient.invalidateQueries({
          queryKey: commentaryKeys.match(matchId),
        });
      }
    };

    socket.on(SOCKET_EVENTS.SCORE_CREATED, refreshHomeFeed);
    socket.on(SOCKET_EVENTS.SCORE_UPDATED, refreshHomeFeed);
    socket.on(SOCKET_EVENTS.COMMENTARY_CREATED, refreshCommentary);
    socket.on(SOCKET_EVENTS.COMMENTARY_DELETED, refreshCommentary);

    return () => {
      roomIds.forEach((matchId) => {
        socket.emit(SOCKET_EVENTS.LEAVE_MATCH, matchId);
      });
      socket.off(SOCKET_EVENTS.SCORE_CREATED, refreshHomeFeed);
      socket.off(SOCKET_EVENTS.SCORE_UPDATED, refreshHomeFeed);
      socket.off(SOCKET_EVENTS.COMMENTARY_CREATED, refreshCommentary);
      socket.off(SOCKET_EVENTS.COMMENTARY_DELETED, refreshCommentary);
    };
  }, [queryClient, roomKey]);
};
