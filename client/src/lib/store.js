import { configureStore } from "@reduxjs/toolkit";
import adminUserReducer from "../slices/adminUserSlice.js";
import commentaryReducer from "../slices/commentarySlice.js";
import matchReducer from "../slices/matchSlice.js";
import playerReducer from "../slices/playerSlice.js";
import scoreReducer from "../slices/scoreSlice.js";
import seriesReducer from "../slices/seriesSlice.js";
import userReducer from "../slices/userSlice.js";
import teamReducer from "../slices/teamSlice.js";

// Redux is reserved for client-owned state; server data should use TanStack Query.
export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    player: playerReducer,
    series: seriesReducer,
    match: matchReducer,
    score: scoreReducer,
    commentary: commentaryReducer,
    adminUser: adminUserReducer,
  },
});

export const dispatch = store.dispatch;
