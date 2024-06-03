import { API } from "@/lib/api";
import getError from "@/utils/error/getError";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
export const getProfile = createAsyncThunk(
  "profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`usersById/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue({ errorMessage: getError(error) });
    }
  }
);
