import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import playerReducer from "../slices/playerSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
  },
});

export const dispatch = store.dispatch;