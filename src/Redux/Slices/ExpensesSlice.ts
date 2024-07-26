import { expenseFormData } from "@/CoomanInterfaceDfined/ComonInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const addExpense = createAsyncThunk(
  "expenses/addExpenses",
  async (data: expenseFormData) => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/expenses/addexpense",
        data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

interface expensesIntitalState {
  expenses: expenseFormData[];
  status: String;
  error: String | null;
}

const initialState: expensesIntitalState = {
  expenses: [],
  status: "idle",
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addExpense.fulfilled,
        (state, action: PayloadAction<expenseFormData>) => {
          state.status = "succeeded";
          state.expenses.push(action.payload);
        }
      )
      .addCase(addExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      });
  },
});

export default expenseSlice.reducer;
