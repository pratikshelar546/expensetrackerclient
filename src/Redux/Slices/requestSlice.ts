import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface RequestState {
  requests: any[];
  loading: boolean;
  error: string | null;
  sendRequestStatus: "idle" | "loading" | "succeeded" | "failed";
  acceptRequestStatus: "idle" | "loading" | "succeeded" | "failed";
  rejectRequestStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RequestState = {
  requests: [],
  loading: false,
  error: null,
  sendRequestStatus: "idle",
  acceptRequestStatus: "idle",
  rejectRequestStatus: "idle",
};

interface SendRequestPayload {
  email: string;
  token?: string; 
  fieldId: string;
}

export const addMember = createAsyncThunk(
  "request/addMember",
  async (
    {  email, token, fieldId }: SendRequestPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}request/addMember/${fieldId}`,
        {
          email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.request;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Accept a request by request ID
export const acceptRequest = createAsyncThunk(
  "request/acceptRequest",
  async (
    { reqId, token }: { reqId: string; token?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}request/acceptRequest/${reqId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reject a request by request ID
export const rejectRequest = createAsyncThunk(
  "request/rejectRequest",
  async (
    { reqId, token }: { reqId: string; token?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}request/rejectRequest/${reqId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { reqId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get all requests for logged-in user
export const fetchAllRequests = createAsyncThunk(
  "request/fetchAllRequests",
  async ({ token }: { token?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}request/getAllRequest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.allRequestList;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Send request
      .addCase(addMember.pending, (state) => {
        state.sendRequestStatus = "loading";
        state.error = null;
      })
      .addCase(addMember.fulfilled, (state, action: PayloadAction<any>) => {
        state.sendRequestStatus = "succeeded";
        state.error = null;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.sendRequestStatus = "failed";
        state.error = action.payload as string;
      })

      // Accept request
      .addCase(acceptRequest.pending, (state) => {
        state.acceptRequestStatus = "loading";
        state.error = null;
      })
      .addCase(acceptRequest.fulfilled, (state) => {
        state.acceptRequestStatus = "succeeded";
        state.error = null;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.acceptRequestStatus = "failed";
        state.error = action.payload as string;
      })

      // Reject request
      .addCase(rejectRequest.pending, (state) => {
        state.rejectRequestStatus = "loading";
        state.error = null;
      })
      .addCase(rejectRequest.fulfilled, (state, action: PayloadAction<{ reqId: string }>) => {
        state.rejectRequestStatus = "succeeded";
        // Remove the rejected request from the list
        state.requests = state.requests.filter(r => r._id !== action.payload.reqId);
        state.error = null;
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.rejectRequestStatus = "failed";
        state.error = action.payload as string;
      })

      // Fetch all requests
      .addCase(fetchAllRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.requests = action.payload;
        state.error = null;
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default requestSlice.reducer;
