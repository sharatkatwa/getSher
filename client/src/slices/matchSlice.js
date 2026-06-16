import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
  name: "matches",

  initialState: {
    matches: [],
  },

  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },

    clearMatches: (state) => {
      state.matches = [];
    },
  },
});

export const {
  setMatches,
  clearMatches,
} = matchSlice.actions;

export default matchSlice.reducer;