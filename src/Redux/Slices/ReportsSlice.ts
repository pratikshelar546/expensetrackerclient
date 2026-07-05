import { ExpenseReportData } from "@/assets/commanInterface/ComonInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/utils/apiClient";

interface GenerateReportPayload {
  token?: string;
  fieldIds?: string[];
  includeTeamPools?: boolean;
}

export const generateReport = createAsyncThunk(
  "reports/generateReport",
  async ({ token, fieldIds = [], includeTeamPools = false }: GenerateReportPayload) => {
    try {
      const response = await apiClient({
        method: "POST",
        url: "reports/generate",
        data: { fieldIds, includeTeamPools },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data as ExpenseReportData & { success: boolean };
    } catch (error: any) {
      throw error.response?.data?.message || error.message;
    }
  }
);

interface ReportsState {
  report: ExpenseReportData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReportsState = {
  report: null,
  status: "idle",
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    clearReport: (state) => {
      state.report = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        generateReport.fulfilled,
        (state, action: PayloadAction<ExpenseReportData & { success: boolean }>) => {
          state.status = "succeeded";
          state.report = {
            pools: action.payload.pools,
            columnTotals: action.payload.columnTotals,
            grandTotal: action.payload.grandTotal,
          };
        }
      )
      .addCase(generateReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to generate report";
      });
  },
});

export const { clearReport } = reportsSlice.actions;
export default reportsSlice.reducer;
