import {
  expenseField,
  tableRow,
} from "@/assets/commanInterface/ComonInterface";
import useFormatDate from "@/Hooks/useFormatDate";
import { NativeSelect, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MobileExpenseSection = ({
  row,
  setRow,
  handleDeleteRow,
  fetchAllExpenses,
  field,
  handleUpdateRow,
  editableRow,
  handleEditRow,
  handleRowChange,
}: {
  row: tableRow[];
  handleDeleteRow: (id: string) => Promise<void>;
  fetchAllExpenses: (fieldId: string) => Promise<void>;
  field: expenseField;
  setRow: Dispatch<SetStateAction<tableRow[]>>;
  handleUpdateRow: (id: string) => Promise<void>;
  handleEditRow: (id: string) => void;
  editableRow: string;
  handleRowChange: (id: string, field: keyof tableRow, value: any) => void;
}) => {
  const textFieldStyle = {
    "& .MuiInputBase-input": {
      color: "white",
      padding: "0px !important",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
    "& .MuiIconButton-root": {
      color: "white",
    },
  };

  return (
    <section className="text-white px-4 h-full max-h-[78vh] overflow-y-auto mt-20 ">
      {row.map((expense) => {
        const isEditable = expense._id === editableRow;
        return (
          <div key={expense._id} className="flex flex-col gap-4">
            <div className="flex justify-between w-full ">
              <h1>Category:</h1>
              {isEditable ? (
                <NativeSelect
                  name="category"
                  fullWidth
                  style={{ color: "white", width: "100px", float: "right" }}
                  margin="none"
                  value={expense.category}
                  onChange={(e) =>
                    handleRowChange(expense._id, "category", e.target.value)
                  }
                  className=" text-white"
                >
                  <option value={"Transport"} className=" text-black">
                    Transport
                  </option>
                  <option value={"Food"} className=" text-black">
                    Food
                  </option>
                  <option value={"Other Expenses"} className=" text-black">
                    Other Expenses
                  </option>
                </NativeSelect>
              ) : (
                <p>{expense.category}</p>
              )}
            </div>
            <div className="flex justify-between">
              <h1>Description:</h1>

              {isEditable ? (
                <input
                  value={expense.desc}
                  onChange={(e) =>
                    handleRowChange(expense._id, "desc", e.target.value)
                  }
                  className="w-32 bg-black text-white"
                />
              ) : (
                <p>{expense.desc}</p>
              )}
            </div>
            <div className="flex justify-between">
              <h1>Price:</h1>
              {isEditable ? (
                <TextField
                  type="number"
                  className="w-32"
                  value={expense.price === 0 ? "" : expense.price}
                  sx={textFieldStyle}
                  onChange={(e) =>
                    handleRowChange(
                      expense._id,
                      "price",
                      Number(e.target.value)
                    )
                  }
                  fullWidth
                />
              ) : (
                <p>{expense.price}</p>
              )}
            </div>
            <div className="flex justify-between">
              <h1>Date:</h1>
              {isEditable ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={textFieldStyle}
                    className="bg-black text-white w-36"
                    value={dayjs(new Date(expense.date))}
                    onChange={(newValue) => {
                      handleRowChange(expense._id, "date", newValue);
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              ) : (
                // eslint-disable-next-line react-hooks/rules-of-hooks
                <p>{useFormatDate(expense?.date)}</p>
              )}
            </div>
            <div className="flex justify-center items-center gap-14 pt-4 ">
              {isEditable ? (
                <FaRegSave
                  color="white"
                  size={"1.5em"}
                  onClick={() => handleUpdateRow(expense._id)}
                />
              ) : (
                <CiEdit
                  color="white"
                  size={"1.5em"}
                  onClick={() => handleEditRow(expense._id)}
                />
              )}
              <MdDelete
                color="white"
                size={"1.5em"}
                onClick={() => handleDeleteRow(expense._id)}
              />
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </div>
        );
      })}
    </section>
  );
};

export default MobileExpenseSection;
