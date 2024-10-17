import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getField = createAsyncThunk("field/createField", async () => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}field/createField`,
    });
  } catch (error: any) {
    throw error.message;
  }
});
