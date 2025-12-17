import { expenseFormData } from "@/assets/commanInterface/ComonInterface";
import CategoryDropdown from "@/CommonComponent/UI/CategoryDropdown";
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { ChangeEvent } from "react";

type Props = {
  formData: expenseFormData;
  setFormData: React.Dispatch<React.SetStateAction<expenseFormData>>;
};

const categoryOptions = [
  "Transport",
  "Food",
  "Fixed Expense",
  "Other Expenses",
];

function AddNewExpense({ formData, setFormData }: Props) {
  const handleCategoryChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    
    // When value is not in dropdown, it's "Add New..." or user typed custom; allow anything
    setFormData({
      ...formData,
      category: value || "",
    });
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "qty" || name === "price"
          ? parseFloat(value)
          : value,
    });
  };

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
         <CategoryDropdown
         value={formData?.category || ""}
         onChange={handleCategoryChange}
         />
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date*"
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
