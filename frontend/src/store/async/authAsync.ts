import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, setAuthToken } from "@/lib/api";

interface ILoginForm {
  email: string;
  password: string;
}

export const loginAsync = createAsyncThunk<
  string,
  ILoginForm,
  { rejectValue: string }
>("auth/login", async (props, { rejectWithValue }) => {
  try {
    const response = await API.post("/login", props);

    const token = response.data.token;

    setAuthToken(token);
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    return rejectWithValue("error");
  }
});

export const authCheckAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("auth/check", async (token, { rejectWithValue }) => {
  try {
    await API.get("/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return token;
  } catch (error) {
    setAuthToken();
    localStorage.removeItem("token");
    return rejectWithValue("error");
  }
});
