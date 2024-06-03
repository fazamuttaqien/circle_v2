import { API } from "@/lib/api";
import getError from "@/utils/error/getError";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSuggested = createAsyncThunk(
  "suggested",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("users/suggested", {
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
