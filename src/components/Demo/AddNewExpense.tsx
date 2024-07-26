import { expenseFormData } from "@/CoomanInterfaceDfined/ComonInterface";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type Props = {
  formData: expenseFormData;
  setFormData: (formData: expenseFormData) => void;
};

function AddNewExpense({ formData, setFormData }: Props) {
  const handleItemChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "qty" || name === "price" ? parseFloat(value) : value,
    });
  };
  // console.log(formData);

  return (
    <>
      <div>
        <TextField
          autoFocus
          required
          margin="dense"
          id="desc"
          name="desc"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleTextChange}
        />
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            name="category"
            fullWidth
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={formData?.category}
            onChange={handleItemChange}
            label="Category"
          >
            <MenuItem value={"Transport"}>Transport</MenuItem>
            <MenuItem value={"Food"}>Food</MenuItem>
            <MenuItem value={"Other Expenses"}>Other Expenses</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          margin="dense"
          id="qyt"
          name="qyt"
          label="Quantity"
          type="number"
          fullWidth
          onChange={handleTextChange}
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="price"
          name="price"
          label="Bill amount"
          type="number"
          fullWidth
          onChange={handleTextChange}
          variant="standard"
        />
      </div>
    </>
  );
}

export default AddNewExpense;
