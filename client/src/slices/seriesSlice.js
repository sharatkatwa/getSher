import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    series: [],
    selectedSeries: null,
  },
  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    setSelectedSeries: (state, action) => {
      state.selectedSeries = action.payload;
    },
    addSeries: (state, action) => {
      state.series.push(action.payload);
    },
    editSeries: (state, action) => {
      const updatedSeries = action.payload;
      state.series = state.series.map((seriesItem) =>
        seriesItem._id === updatedSeries._id ? updatedSeries : seriesItem,
      );
    },
    removeSeries: (state, action) => {
      state.series = state.series.filter((seriesItem) => seriesItem._id !== action.payload);
    },
    clearSelectedSeries: (state) => {
      state.selectedSeries = null;
    },
  },
});

export const {
  setSeries,
  setSelectedSeries,
  addSeries,
  editSeries,
  removeSeries,
  clearSelectedSeries,
} = seriesSlice.actions;

export default seriesSlice.reducer;
