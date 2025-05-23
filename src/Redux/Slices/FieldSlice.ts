"use client";
import {
  addField,
  expenseField,
} from "@/assets/commanInterface/ComonInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";



interface updateField {
  data: expenseField;
  id: string;
  token?: string
}

export const createField = createAsyncThunk(
  "field/createField",
  async ({ data, token }: { data: addField, token?: string }) => {

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}field/createField`,
        data,
        headers: {
          Authorization: `Bearer ${token}`, // Adding Bearer token in the Authorization header
        },
      });

      return response.data.response._id;
    } catch (error: any) {
      throw error.message;
    }
  }
);

export const getField = createAsyncThunk(
  "field/getField",
  async ({ token, fieldType }: { fieldType?: string, token?: string }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}field${fieldType ? `?fieldType=${fieldType}` : "/"
          }`,
        headers: {
          Authorization: `Bearer ${token}`, // Adding Bearer token in the Authorization header
        },
      });

      return response.data.expenseField;
    } catch (error: any) {
      throw error.message;
    }
  }
);

export const deleteField = createAsyncThunk(
  "field/DeleteField",
  async ({ id, token }: { id: string, token?: string }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}field/${id}`,
        headers: {
          Authorization: `Bearer ${token}`, // Adding Bearer token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateField = createAsyncThunk(
  "expenses/updateFields",
  async ({ data, id, token }: updateField) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}field/${id}/update`,
        data,
        headers: {
          Authorization: `Bearer ${token}`, // Adding Bearer token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getFieldById = createAsyncThunk(
  "field/getFieldById",
  async ({ id, token }: { id: string, token?: string }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}field/${id}`,
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

interface fieldInitialState {
  expensesField: expenseField | null;
  allField: expenseField[];
  status: String;
  error: String | null;
}

const initialState: fieldInitialState = {
  expensesField: null,
  allField: [],
  status: "idle",
  error: null,
};

const fieldSlice = createSlice({
  name: "expenseField",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createField.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        createField.fulfilled,
        (state, action: PayloadAction<expenseField>) => {
          state.status = "succeeded";
          state.expensesField = action.payload;
        }
      )
      .addCase(createField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      })
      .addCase(getField.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        getField.fulfilled,
        (state, action: PayloadAction<expenseField[]>) => {
          state.status = "succeeded";
          state.allField = action.payload;
        }
      )
      .addCase(getField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      })
      .addCase(deleteField.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteField.fulfilled,
        (state, action: PayloadAction<expenseField>) => {
          state.status = "succeeded";
          state.expensesField = action.payload;
        }
      )
      .addCase(deleteField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      })
      .addCase(updateField.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateField.fulfilled,
        (state, action: PayloadAction<expenseField>) => {
          state.status = "succeeded";
          state.expensesField = action.payload;
        }
      )
      .addCase(updateField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      })
      .addCase(getFieldById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        getFieldById.fulfilled,
        (state, action: PayloadAction<expenseField[]>) => {
          state.status = "succeeded";
          state.allField = action.payload;
        }
      )
      .addCase(getFieldById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to get field data";
      });
  },
});

export default fieldSlice.reducer;
