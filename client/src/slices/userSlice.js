import { createSlice } from "@reduxjs/toolkit";

// Stores the authenticated user snapshot after login/me requests.
const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    id: "",
    email: "",
    picture: "",
    role: ""
  },
  reducers: {
    setUser: (state,action) =>{
        state.id = action.payload.id
        state.name = action.payload.name
        state.email = action.payload.email
        state.picture = action.payload.picture
        state.role = action.payload.role
    },
    clearUser: (state) => {
        state.id = ""
        state.name = ""
        state.email = ""
        state.picture = ""
        state.role = ""
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
