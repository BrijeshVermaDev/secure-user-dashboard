import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  mobile?: string;
  token?: string;
}

interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") ?? "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
