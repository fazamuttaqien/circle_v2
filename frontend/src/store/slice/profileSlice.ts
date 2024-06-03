import { IUser } from "@/types/app";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../async/profileAsync";

type initialStateT = {
  data: IUser | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const initialState: initialStateT = {
  data: null,
  isLoading: true,
  isError: false,
  error: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
      // the data is being processed from our API set to true
    });
    builder.addCase(
      getProfile.fulfilled,
      // the API data call was successful and the data was retrieved
      (state, action: PayloadAction<IUser>) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      }
    );
    builder.addCase(
      getProfile.rejected,
      // the data failed to be retrieved, then the error data is also retrieved
      (state, action: PayloadAction<any>) => {
        state.data = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.errorMessage || "Unknown Error Occured";
      }
    );
  },
});

export default profileSlice.reducer;
