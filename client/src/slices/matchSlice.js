import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
  name: "match",
  initialState: {
    matches: [],
    selectedMatch: null,
  },
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    setSelectedMatch: (state, action) => {
      state.selectedMatch = action.payload;
    },
    addMatch: (state, action) => {
      state.matches.push(action.payload);
    },
    editMatch: (state, action) => {
      const updatedMatch = action.payload;
      state.matches = state.matches.map((match) =>
        match._id === updatedMatch._id ? updatedMatch : match,
      );
    },
    removeMatch: (state, action) => {
      state.matches = state.matches.filter((match) => match._id !== action.payload);
    },
    clearSelectedMatch: (state) => {
      state.selectedMatch = null;
    },
  },
});

export const {
  setMatches,
  setSelectedMatch,
  addMatch,
  editMatch,
  removeMatch,
  clearSelectedMatch,
} = matchSlice.actions;

export default matchSlice.reducer;
