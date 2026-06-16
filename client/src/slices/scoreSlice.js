import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: {
    scores: [],
    selectedScore: null,
  },
  reducers: {
    setScores: (state, action) => {
      state.scores = action.payload;
    },
    setSelectedScore: (state, action) => {
      state.selectedScore = action.payload;
    },
    addScore: (state, action) => {
      state.scores.push(action.payload);
    },
    editScore: (state, action) => {
      const updatedScore = action.payload;
      state.scores = state.scores.map((score) =>
        score._id === updatedScore._id ? updatedScore : score,
      );
    },
    clearSelectedScore: (state) => {
      state.selectedScore = null;
    },
  },
});

export const {
  setScores,
  setSelectedScore,
  addScore,
  editScore,
  clearSelectedScore,
} = scoreSlice.actions;

export default scoreSlice.reducer;
