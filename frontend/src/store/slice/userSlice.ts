import { IUser } from "@/types/app";
import { getDetailUser } from "../async/userAsync";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateT = {
  data: IUser | null;
};

const initialState: initialStateT = {
  data: null,
};

const detailUserSlice = createSlice({
  name: "detailUser",
  initialState,
  reducers: {}, // this not filled in because it uses extraReducers
  extraReducers: (builder) => {
    builder.addCase(getDetailUser.pending, (state) => {
      // data is being processed from our API set to true
    });
    builder.addCase(
      getDetailUser.fulfilled,
      // API data call is successful and the data is retrieved
      (state, action: PayloadAction<IUser>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(
      getDetailUser.rejected,
      // the data failed to be retrieved, then the error data is also retrieved
      (state, action: PayloadAction<any>) => {
        state.data = null;
      }
    );
  },
});

export default detailUserSlice.reducer;
