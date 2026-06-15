import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import matchReducer from "../slices/matchSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    matches: matchReducer,
  },
});

export const dispatch = store.dispatch;
