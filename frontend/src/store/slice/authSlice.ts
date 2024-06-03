import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "@/store/type/state";
import { IUser } from "@/types/app";
import { authCheckAsync, loginAsync } from "@/store/async/authAsync";

const initialState: IAuthState = {
  isLogin: false,
  token: "",
  user: {} as IUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<{ token: string; user: IUser }>) => {
      state.isLogin = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLogin = true;
        state.token = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLogin = false;
        state.token = "";
        state.user = {} as IUser;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLogin = false;
      });

    builder
      .addCase(
        authCheckAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLogin = true;
          state.token = action.payload;
        }
      )
      .addCase(authCheckAsync.rejected, (state) => {
        state.isLogin = false;
        state.token = "";
        state.user = {} as IUser;
      })
      .addCase(authCheckAsync.pending, (state) => {
        state.isLogin = false;
      });
  },
});

export const { LOGIN } = authSlice.actions;
export default authSlice.reducer;
