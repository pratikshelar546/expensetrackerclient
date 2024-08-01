import {
  expenseFormData,
  tableRow,
} from "@/CoomanInterfaceDfined/ComonInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const addExpense = createAsyncThunk(
  "expenses/addExpenses",
  async (data: expenseFormData) => {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}expenses/addexpense`,
        data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllExpenses = createAsyncThunk(
  "expenses/getExpenses",
  async () => {
    try {
      const response = await axios<{ expensesList: tableRow[] }>({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}expenses`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface expensesIntitalState {
  expenses: tableRow[];
  newExpense: expenseFormData | null;
  status: String;
  error: String | null;
}

const initialState: expensesIntitalState = {
  expenses: [],
  newExpense: null,
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
          state.newExpense = action.payload;
        }
      )
      .addCase(addExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      })
      .addCase(getAllExpenses.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(
        getAllExpenses.fulfilled,
        (state, action: PayloadAction<{ expensesList: tableRow[] }>) => {
          state.status = "succeeded";
          state.expenses = action.payload.expensesList;
        }
      )
      .addCase(getAllExpenses.rejected, (state, action) => {
        (state.status = "Failed"),
          (state.error = action.error.message || "Failed to get expense");
      });
  },
});

export default expenseSlice.reducer;
