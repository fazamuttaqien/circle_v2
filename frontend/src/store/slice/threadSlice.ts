import { IThread } from "@/types/app";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getThreadByUserId } from "../async/threadAsync";

type initialStateT = {
  data: IThread[] | null;
};

const initialState: initialStateT = {
  data: null,
};

const threadByUserIdSlice = createSlice({
  name: "threadByUserId",
  initialState,
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(getThreadByUserId.pending, (state) => {
      // the data is being processed from our API set to true
    });
    builder.addCase(
      getThreadByUserId.fulfilled,
      // the API data call was successful and the data was retrieved
      (state, action: PayloadAction<IThread[]>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(
      getThreadByUserId.rejected,
      // the data failed to be retrieved, then the error data is also retrieved
      (state, action: PayloadAction<any>) => {
        state.data = null;
      }
    );
  },
});

export default threadByUserIdSlice.reducer;
