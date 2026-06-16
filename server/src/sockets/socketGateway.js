import { Server } from "socket.io";
import logger from "../config/logger.js";

let ioInstance = null;

const getMatchRoom = (matchId) => `match:${matchId}`;

export const initSocket = (httpServer, corsOrigin) => {
  ioInstance = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      credentials: true,
    },
  });

  ioInstance.on("connection", (socket) => {
    logger.info('socket connected');
  
    socket.on("join-match", (matchId) => {
      if (!matchId) return;
      socket.join(getMatchRoom(matchId));
    });

    socket.on("leave-match", (matchId) => {
      if (!matchId) return;
      socket.leave(getMatchRoom(matchId));
    });

    socket.on("disconnect", () => {});
  });

  return ioInstance;
};

export const emitToMatch = (matchId, event, payload) => {
  if (!ioInstance || !matchId || !event) return;

  ioInstance.to(getMatchRoom(matchId)).emit(event, payload);
};

export const getSocketInstance = () => ioInstance;
