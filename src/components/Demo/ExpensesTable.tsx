"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  addExpense,
  deleteExpenses,
  getAllExpenses,
  updateExpense,
} from "@/Redux/Slices/ExpensesSlice";
import {
  expenseField,
  tableRow,
} from "@/assets/commanInterface/ComonInterface";
import { useAppDispatch } from "../../../Hooks";
import { CiEdit } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { NativeSelect, Tab, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { updateField } from "@/Redux/Slices/FieldSlice";

const tableCellData = [
  "Date",
  "Category",
  "Description",
  "Quantity",
  "Price",
  "action",
];

export default function ExpensesTable({
  isOpen,
  field,
}: {
  isOpen: string | null;
  field: expenseField;
}) {
  const dispatch = useAppDispatch();
  const { balance, RecivedAmount } = field;
  const [row, setRow] = useState<tableRow[]>([]);
  const [editableRow, setEditableRow] = useState("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [fieldBalance, setFieldBalnce] = useState<number>(0);

  // fetch all expenses for all the field
  const fetchAllExpenses = async (fieldId: string) => {
    const response = await dispatch(getAllExpenses(fieldId));
    if (getAllExpenses.fulfilled.match(response)) {
      setRow(response.payload.expensesList as tableRow[]);
    }
  };

  useEffect(() => {
    fetchAllExpenses(field._id);

    if (field.balance) {
      setFieldBalnce(field.balance);
    }
  }, []);

  const handleAddExpenseClick = () => {
    const hasNewRow = row.some((rows) => rows._id === "newRow");

    if (hasNewRow) {
      toast.error("Save previous expense");
    } else {
      setRow((oldRow: tableRow[]) => [
        ...oldRow,
        {
          _id: "newRow",
          desc: "",
          category: "Transport",
          qyt: 0,
          price: 0,
          date: new Date(),
        },
      ]);
    }
    calculateBalance();

    setEditableRow("newRow");
  };

  const handleRowChange = (id: string, field: keyof tableRow, value: any) => {
    setRow((prevRows) =>
      prevRows.map((row) => (row._id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleEditRow = (id: string) => {
    setEditableRow(id === editableRow ? "" : id);
  };

  const handleUpdateRow = async (id: string) => {
    if (id === "newRow") {
      const newRow = row.find((row) => row._id === id);
      if (newRow) {
        const { _id, ...rest } = newRow;
        await dispatch(
          addExpense({
            data: rest,
            id: field._id,
          })
        );

        setRow((oldRow: tableRow[]) => {
          return oldRow.filter((row) => row._id !== "newRow");
        });
        await fetchAllExpenses(field._id);

        calculateBalance();
      }
    } else {
      const updateRow = row.find((row) => row._id === id);
      if (updateRow) {
        const { _id, ...rest } = updateRow;
        await dispatch(updateExpense({ data: rest, id }));
        fetchAllExpenses(field._id);
        calculateBalance();
      }
    }
    setEditableRow("");
  };

  const handleDeleteRow = async (id: String) => {
    await dispatch(deleteExpenses(id));
    await fetchAllExpenses(field._id);
    calculateBalance();
  };

  const calculateBalance = async () => {
    const feildToUpdate = { ...field, balance: fieldBalance };
    await dispatch(updateField({ data: feildToUpdate, id: field._id }));
    setFieldBalnce(fieldBalance);
  };

  useEffect(() => {
    const calc = row.reduce((sum, { price = 0 }) => sum + price, 0);
    setTotalAmount(calc);
    console.log("calc");
    if (calc) {
      const fieldBalance = (RecivedAmount ?? 0) - calc;
      setFieldBalnce(fieldBalance);
    }
  }, [row]);

  const textFieldStyle = {
    "& .MuiInputBase-input": {
      color: "white",
      padding: "4px !important",
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
    <div className={isOpen === field._id ? "block" : "hidden"}>
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "transparent",
          color: "white",
          padding: "1rem",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {tableCellData.map((cell, index) => (
                <TableCell
                  key={index}
                  style={{ color: "white" }}
                  align="center"
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((row) => {
              const isEditable = row._id === editableRow;

              return (
                <TableRow key={row._id} hover>
                  <TableCell
                    width={180}
                    align="center"
                    style={{ color: "white" }}
                  >
                    {isEditable ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={textFieldStyle}
                          value={dayjs(new Date(row.date))}
                          onChange={(newValue) => {
                            handleRowChange(row._id, "date", newValue);
                          }}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </LocalizationProvider>
                    ) : (
                      (row.date instanceof Date
                        ? dayjs(row.date)
                        : dayjs(row.date)
                      ).format("YYYY-MM-DD")
                    )}
                  </TableCell>

                  <TableCell
                    width={140}
                    align="center"
                    style={{ color: "white" }}
                  >
                    {isEditable ? (
                      <NativeSelect
                        name="category"
                        fullWidth
                        margin="none"
                        value={row.category}
                        onChange={(e) =>
                          handleRowChange(row._id, "category", e.target.value)
                        }
                        className=" text-white"
                      >
                        <option value={"Transport"} className=" text-black">
                          Transport
                        </option>
                        <option value={"Food"} className=" text-black">
                          Food
                        </option>
                        <option
                          value={"Other Expenses"}
                          className=" text-black"
                        >
                          Other Expenses
                        </option>
                      </NativeSelect>
                    ) : (
                      row.category
                    )}
                  </TableCell>

                  <TableCell
                    width={140}
                    align="center"
                    style={{ color: "white" }}
                  >
                    {isEditable ? (
                      <TextField
                        sx={textFieldStyle}
                        value={row.desc}
                        onChange={(e) =>
                          handleRowChange(row._id, "desc", e.target.value)
                        }
                        focused
                      />
                    ) : (
                      row.desc
                    )}
                  </TableCell>

                  <TableCell
                    width={110}
                    align="center"
                    style={{ color: "white" }}
                  >
                    {isEditable ? (
                      <TextField
                        type="number"
                        value={row.qyt === 0 ? "" : row.qyt}
                        sx={textFieldStyle}
                        onChange={(e) =>
                          handleRowChange(
                            row._id,
                            "qyt",
                            Number(e.target.value)
                          )
                        }
                        fullWidth
                      />
                    ) : (
                      row.qyt
                    )}
                  </TableCell>

                  <TableCell
                    width={110}
                    align="center"
                    style={{ color: "white" }}
                  >
                    {isEditable ? (
                      <TextField
                        type="number"
                        value={row.price === 0 ? "" : row.price}
                        sx={textFieldStyle}
                        onChange={(e) =>
                          handleRowChange(
                            row._id,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        fullWidth
                      />
                    ) : (
                      row.price
                    )}
                  </TableCell>

                  <TableCell width={110} align="center">
                    <div className="flex gap-4 justify-center w-full">
                      {isEditable ? (
                        <FaRegSave
                          color="white"
                          size={"1.5em"}
                          onClick={() => handleUpdateRow(row._id)}
                        />
                      ) : (
                        <CiEdit
                          color="white"
                          size={"1.5em"}
                          onClick={() => handleEditRow(row._id)}
                        />
                      )}
                      <MdDelete
                        color="white"
                        size={"1.5em"}
                        onClick={() => handleDeleteRow(row._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell
                style={{ color: "white", fontSize: "20px" }}
                align="center"
                rowSpan={4}
              >
                Total
              </TableCell>
              <TableCell />
              <TableCell style={{ color: "white" }} align="center" rowSpan={6}>
                {totalAmount}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="p-3 w-full">
        <button
          className="text-white border border-gray-400 py-2 px-4 hover:bg-gray-300 hover:text-gray-900 rounded-xl relative right-0"
          onClick={handleAddExpenseClick}
        >
          Add Expense
        </button>
        <h1 className="text-white px-4">
          {field?.RecivedAmount
            ? `Recived amount : ${field?.RecivedAmount}`
            : null}
        </h1>

        <h1 className="text-white px-4">
          {fieldBalance ? `Balance : ${fieldBalance}` : null}
        </h1>
      </div>
    </div>
  );
}
