import { io } from "socket.io-client";

import { VITE_SOCKET_URL } from "../utils/env.js";

export const socket = io(VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});
