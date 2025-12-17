import React from 'react'
import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material'

const CategoryDropdown = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (event: React.SyntheticEvent<Element, Event>, value: string | null) => void;
}) => {
    // Default categories
const categoryOptions = [
    "Transport",
    "Food",
    "Fixed Expense",
    "Other Expenses",
  ];
  return (
    <Autocomplete
            freeSolo
            options={categoryOptions}
            value={value || ""}
            onChange={onChange}
            inputValue={value || ""}
            onInputChange={(event, newInputValue) => {
              onChange(event, newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                name="category"
                variant="outlined"
                required
                sx={{
                  color: "white",
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
                  mt: 0,
                }}
              />
            )}
            sx={{
              ".MuiInputBase-root": {
                color: "white",
              },
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
          />
  )
}

export default CategoryDropdown