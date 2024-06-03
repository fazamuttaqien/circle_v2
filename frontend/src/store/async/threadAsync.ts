import { API } from "@/lib/api";
import getError from "@/utils/error/getError";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
export const getThreadByUserId = createAsyncThunk(
  "threadByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`threads/byUserId`, {
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
