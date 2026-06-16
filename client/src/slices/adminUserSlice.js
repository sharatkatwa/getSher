import { createSlice } from "@reduxjs/toolkit";

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    users: [],
    selectedUser: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    editUser: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user,
      );
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
});

export const {
  setUsers,
  setSelectedUser,
  editUser,
  removeUser,
  clearSelectedUser,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
