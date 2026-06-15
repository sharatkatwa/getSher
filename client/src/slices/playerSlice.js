import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    players: [],
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;