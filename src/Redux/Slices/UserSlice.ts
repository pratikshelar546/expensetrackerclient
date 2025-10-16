import { userData } from "@/assets/commanInterface/ComonInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/api";

export const signup = createAsyncThunk(
  "user/signup",
  async (data: userData) => {
    try {
      const response = await axios.post(
        `${API_URL}user/auth`,
        data
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface userinitialState {
  user: userData | null;
  status: string;
  error: string | null;
}

const initialState: userinitialState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "Loding";
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<userData>) => {
        (state.status = "succeeded"), (state.user = action.payload);
      })
      .addCase(signup.rejected, (state, action) => {
        (state.status = "Rejected"),
          (state.error = action.error.message || "Falid to add user Try again");
      });
  },
});

export default userSlice.reducer;
