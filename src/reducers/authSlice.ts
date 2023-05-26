import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogged: boolean;
  userEmail: string | null;
  userUID: string | null;
}

const initialState: AuthState = {
  isLogged: false,
  userEmail: null,
  userUID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (
      state: AuthState,
      action: PayloadAction<{ isLogged: boolean; email: string; uid: string }>
    ) => {
      state.isLogged = action.payload.isLogged;
      state.userEmail = action.payload.email;
      state.userUID = action.payload.uid;
    },
    logOut: (state: AuthState) => {
      state.isLogged = false;
      state.userEmail = null;
      state.userUID = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
