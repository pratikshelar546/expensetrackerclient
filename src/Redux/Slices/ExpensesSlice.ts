import {
  expenseFormData,
  tableRow,
} from "@/assets/commanInterface/ComonInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/utils/apiClient";

interface updateExpensePayload {
  data: expenseFormData;
  id: String;
  fieldId?: String;
  token?:string
}


export const getAllExpenses = createAsyncThunk(
  "expenses/getExpenses",
  async (id: string) => {
    try {
      const response = await apiClient<{ expensesList: tableRow[] }>({
        method: "GET",
        url: `expenses/${id}`,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpenses",
  async ({ data, id ,token}: updateExpensePayload) => {
    try {
      const response = await apiClient({
        method: "POST",
        url: `field/add-expense/${id}`,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpenses",
  async ({ data, id }: updateExpensePayload) => {
    try {
      const response = await apiClient({
        method: "PUT",
        url: `expenses/updateExpense/${id}`,
        data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteExpenses = createAsyncThunk(
  "expense/DeleteExpense",
  async (id: String) => {
    try {
      const response = await apiClient({
        method: "DELETE",
        url: `expenses/deleteExpense/${id}`,
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
        state.status = "loading";
      })
      .addCase(
        getAllExpenses.fulfilled,
        (state, action: PayloadAction<{ expensesList: tableRow[] }>) => {
          state.status = "succeeded";
          state.expenses = action.payload.expensesList;
        }
      )
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to get expense";
      })
      .addCase(updateExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateExpense.fulfilled,
        (state, action: PayloadAction<expenseFormData>) => {
          state.status = "succeeded";
          state.newExpense = action.payload;
        }
      )
      .addCase(updateExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      })
      .addCase(deleteExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteExpenses.fulfilled,
        (state, action: PayloadAction<expenseFormData>) => {
          state.status = "succeeded";
          state.newExpense = action.payload;
        }
      )
      .addCase(deleteExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      });
  },
});

export default expenseSlice.reducer;
