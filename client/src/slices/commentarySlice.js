import { createSlice } from "@reduxjs/toolkit";

const commentarySlice = createSlice({
  name: "commentary",
  initialState: {
    commentary: [],
    selectedCommentary: null,
  },
  reducers: {
    setCommentary: (state, action) => {
      state.commentary = action.payload;
    },
    setSelectedCommentary: (state, action) => {
      state.selectedCommentary = action.payload;
    },
    addCommentary: (state, action) => {
      state.commentary.unshift(action.payload);
    },
    removeCommentary: (state, action) => {
      state.commentary = state.commentary.filter(
        (commentaryItem) => commentaryItem._id !== action.payload,
      );
    },
    clearSelectedCommentary: (state) => {
      state.selectedCommentary = null;
    },
  },
});

export const {
  setCommentary,
  setSelectedCommentary,
  addCommentary,
  removeCommentary,
  clearSelectedCommentary,
} = commentarySlice.actions;

export default commentarySlice.reducer;
