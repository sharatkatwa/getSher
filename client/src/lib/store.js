import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import teamReducer from "../slices/teamSlice.js";

// Redux is reserved for client-owned state; server data should use TanStack Query.
export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
  },
});

export const dispatch = store.dispatch;
