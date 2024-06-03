import { IUser } from "@/types/app";
import { getSuggested } from "../async/suggestedAsync";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateT = {
  data: IUser[];
  isLoading: boolean;
  isError: boolean;
  error: string;
};

const initialState: initialStateT = {
  data: [],
  isLoading: true,
  isError: false,
  error: "",
};

const suggestedSlice = createSlice({
  name: "suggested",
  initialState,
  reducers: {}, // not filled in because it uses extraReducers
  extraReducers: (builder) => {
    builder.addCase(getSuggested.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getSuggested.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      }
    );
    builder.addCase(
      getSuggested.rejected,
      (state, action: PayloadAction<any>) => {
        state.data = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.errorMessage || "Unknown Error Occured";
      }
    );
  },
});

export default suggestedSlice.reducer;
