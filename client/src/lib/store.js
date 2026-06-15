import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import playerReducer from "../slices/playerSlice.js";

// Redux is reserved for client-owned state; server data should use TanStack Query.
export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
  },
});

export const dispatch = store.dispatch;