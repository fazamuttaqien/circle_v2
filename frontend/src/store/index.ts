import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/authSlice";
import profileSlice from "./slice/profileSlice";
import suggestedSlice from "./slice/suggestedSlice";
import detailUserSlice from "./slice/userSlice";
import threadByUserIdSlice from "./slice/threadSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileSlice,
    suggested: suggestedSlice,
    detailUser: detailUserSlice,
    threadByUserId: threadByUserIdSlice,
  },
});

// static type untuk selector dan dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks yang sudah diberi static type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
