import {
  expenseFormData,
  tableRow,
} from "@/assets/commanInterface/ComonInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useSession } from "next-auth/react";

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
      const response = await axios<{ expensesList: tableRow[] }>({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}expenses/${id}`,
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
    const { data: session } = useSession();
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}field/add-expense/${id}`,
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
      const response = await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}expenses/udpateExpense/${id}`,
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
      const response = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}expenses/deleteExpense/${id}`,
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
