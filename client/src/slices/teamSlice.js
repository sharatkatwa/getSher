import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    selectedTeam: null,
  },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },

    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },

    addTeam: (state, action) => {
      state.teams.push(action.payload);
    },

    editTeam: (state, action) => {
      const updatedTeam = action.payload;

      state.teams = state.teams.map((team) =>
        team._id === updatedTeam._id ? updatedTeam : team
      );
    },

    removeTeam: (state, action) => {
      state.teams = state.teams.filter((team) => team._id !== action.payload);
    },

    clearSelectedTeam: (state) => {
      state.selectedTeam = null;
    },
  },
});

export const {
  setTeams,
  setSelectedTeam,
  addTeam,
  editTeam,
  removeTeam,
  clearSelectedTeam,
} = teamSlice.actions;

export default teamSlice.reducer;