import { expenseFormData } from "@/assets/commanInterface/ComonInterface";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { ChangeEvent } from "react";

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
      <div className="flex flex-col gap-6 p-4">
        <TextField
          autoFocus
          required
          id="desc"
          name="desc"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleTextChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
          }}
        />

        <FormControl fullWidth>
          <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Category
          </InputLabel>
          <Select
            name="category"
            value={formData?.category}
            onChange={handleItemChange}
            label="Category"
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.23)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
              ".MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            <MenuItem value={"Transport"}>Transport</MenuItem>
            <MenuItem value={"Food"}>Food</MenuItem>
            <MenuItem value={"Other Expenses"}>Other Expenses</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={formData?.date ? dayjs(formData?.date) : null}
            onChange={(newValue) =>
              setFormData({ ...formData, date: newValue ? newValue.toDate() : null })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          />
        </LocalizationProvider>

        <TextField
          required
          id="price"
          name="price"
          label="Bill Amount"
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span className="text-white">₹</span>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.4)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
          }}
        />
      </div>
    </>
  );
}

export default AddNewExpense;
