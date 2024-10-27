"use client";
import {
  addField,
  expenseField,
} from "@/assets/commanInterface/ComonInterface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const createField = createAsyncThunk(
  "field/createField",
  async (data: addField) => {
    console.log(data);

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

export const getField = createAsyncThunk("field/getField", async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}field/`,
      headers: {
        Authorization: `Bearer ${token}`, // Adding Bearer token in the Authorization header
      },
    });

    return response.data.expenseField;
  } catch (error: any) {
    throw error.message;
  }
});

export const deleteField = createAsyncThunk(
  "field/DeleteField",
  async (id: String) => {
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

interface fieldInitialState {
  expensesField: String;
  allField: expenseField[];
  status: String;
  error: String | null;
}

const initialState: fieldInitialState = {
  expensesField: "",
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
        (state, action: PayloadAction<String>) => {
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
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.expensesField = action.payload;
        }
      )
      .addCase(deleteField.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add expense";
      });
  },
});

export default fieldSlice.reducer;
