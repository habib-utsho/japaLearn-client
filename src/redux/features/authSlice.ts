import { createSlice } from "@reduxjs/toolkit";
import { TDecodedUser } from "../../types/index.type";

type TInitialAuthState = {
  user: null | TDecodedUser;
  isAuthLoading: boolean;
  token: null | string;
};

const initialState: TInitialAuthState = {
  user: null,
  token: null,
  isAuthLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setAuthLoading(state, action) {
      state.isAuthLoading = action.payload;
    },
    signOut(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setAuthLoading, signOut } = authSlice.actions;
export default authSlice.reducer;
