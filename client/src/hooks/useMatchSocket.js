import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { socket } from "../lib/socket.js";
import { SOCKET_EVENTS } from "../sockets/socketEvents.js";
import { commentaryKeys } from "./useCommentary.js";
import { scoreKeys } from "./useScores.js";

export const useMatchSocket = (matchId) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!matchId) return undefined;

    socket.connect();
    socket.emit(SOCKET_EVENTS.JOIN_MATCH, matchId);

    const refreshScores = () => {
      queryClient.invalidateQueries({ queryKey: scoreKeys.match(matchId) });
    };

    const refreshCommentary = () => {
      queryClient.invalidateQueries({
        queryKey: commentaryKeys.match(matchId),
      });
    };

    socket.on(SOCKET_EVENTS.SCORE_CREATED, refreshScores);
    socket.on(SOCKET_EVENTS.SCORE_UPDATED, refreshScores);
    socket.on(SOCKET_EVENTS.COMMENTARY_CREATED, refreshCommentary);
    socket.on(SOCKET_EVENTS.COMMENTARY_DELETED, refreshCommentary);

    return () => {
      socket.emit(SOCKET_EVENTS.LEAVE_MATCH, matchId);
      socket.off(SOCKET_EVENTS.SCORE_CREATED, refreshScores);
      socket.off(SOCKET_EVENTS.SCORE_UPDATED, refreshScores);
      socket.off(SOCKET_EVENTS.COMMENTARY_CREATED, refreshCommentary);
      socket.off(SOCKET_EVENTS.COMMENTARY_DELETED, refreshCommentary);
    };
  }, [matchId, queryClient]);
};
