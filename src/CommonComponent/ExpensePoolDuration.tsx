"use client";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const durationOptions = [
  { label: "30 Days", value: "30" },
  { label: "60 Days", value: "60" },
  { label: "90 Days", value: "90" },
  { label: "Custom Date", value: "custom" },
];

interface ExpensePoolDurationProps {
  onChange: (value: string | null) => void;
}

const ExpensePoolDuration: React.FC<ExpensePoolDurationProps> = ({
  onChange,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [customDate, setCustomDate] = useState<Dayjs | null>(null);

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedDuration(value);
    if (value !== "custom") {
      const futureDate = dayjs().add(Number(value), "day").format("DD-MMM-YYYY");
      onChange(futureDate); // Send selected duration date
    } else {
      onChange(null); // Reset when switching to custom
    }
  };

  const handleCustomDateChange = (date: Dayjs | null) => {
    setCustomDate(date);
    onChange(date ? date.format("DD-MMM-YYYY") : null);
  };

  return (
    <>
      <RadioGroup
        value={selectedDuration}
        onChange={handleDurationChange}
        sx={{ color: "white" }}
      >
        <div className="grid grid-cols-2 gap-4">
          {durationOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio sx={{ color: "white" }} />}
              label={option.label}
              sx={{ color: "white" }}
            />
          ))}
        </div>
      </RadioGroup>
      {selectedDuration === "custom" && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Custom Date"
            value={customDate}
            onChange={handleCustomDateChange}
            disablePast
            sx={{
              backgroundColor: "#1E1E1E", // Dark background for the input
              borderRadius: "8px",
              color: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" }, // Subtle border
                "&:hover fieldset": { borderColor: "#888" }, // Border color on hover
                "&.Mui-focused fieldset": { borderColor: "#00bcd4" }, // Cyan focus border
              },
              "& .MuiInputLabel-root": {
                color: "#bbb", // Lighter label color for readability
              },
              "& .MuiInputBase-input": {
                color: "white", // Ensures text inside the input is white
              },
            }}
            slotProps={{
              textField: { fullWidth: true },
              popper: {
                sx: {
                  "& .MuiPaper-root": {
                    backgroundColor: "#2C2C2C", // Dark background for the dropdown
                    color: "white",
                    borderRadius: "8px",
                  },
                  "& .MuiPickersDay-root": {
                    color: "#ddd", // Default date color
                  },
                  "& .MuiPickersDay-root.Mui-selected": {
                    backgroundColor: "#00bcd4", // Highlight selected date
                    color: "black",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      )}
    </>
  );
};

export default ExpensePoolDuration;
