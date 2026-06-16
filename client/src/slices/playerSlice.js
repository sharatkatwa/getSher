import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    players: [],
    selectedPlayer: null,
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setSelectedPlayer: (state, action) => {
      state.selectedPlayer = action.payload;
    },
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    editPlayer: (state, action) => {
      const updatedPlayer = action.payload;
      state.players = state.players.map((player) =>
        player._id === updatedPlayer._id ? updatedPlayer : player,
      );
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter((player) => player._id !== action.payload);
    },
    clearSelectedPlayer: (state) => {
      state.selectedPlayer = null;
    },
  },
});

export const {
  setPlayers,
  setSelectedPlayer,
  addPlayer,
  editPlayer,
  removePlayer,
  clearSelectedPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
