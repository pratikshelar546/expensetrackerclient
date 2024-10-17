import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  addExpense,
  deleteExpenses,
  getAllExpenses,
  updateExpense,
} from "@/Redux/Slices/ExpensesSlice";
import { tableRow } from "@/assets/commanInterface/ComonInterface";
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
import axios from "axios";
const tableCellData = [
  "Date",
  "Category",
  "Description",
  "Quantity",
  "Price",
  "action",
];

export default function ExpensesTable() {
  const dispatch = useAppDispatch();
  const [row, setRow] = useState<tableRow[]>([]);
  const [editableRow, setEditableRow] = useState("");

  const fetchData = async () => {
    const data = await dispatch(getAllExpenses());
    if (getAllExpenses.fulfilled.match(data)) {
      setRow(data.payload.expensesList as tableRow[]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem("token");
  const createFeild = async () => {
    const data = { feildName: "hello" };
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}field/createField`,
        data,
        headers: {
          Authorization: `Bearer ${token}`, // Adding Bearer token in the Authorization header
        },
      });

      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  createFeild();

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
        await dispatch(addExpense(rest));

        setRow((oldRow: tableRow[]) => {
          return oldRow.filter((row) => row._id !== "newRow");
        });
        await fetchData();
      }
    } else {
      const updateRow = row.find((row) => row._id === id);
      if (updateRow) {
        const { _id, ...rest } = updateRow;
        await dispatch(updateExpense({ data: rest, id }));
        fetchData();
      }
    }

    setEditableRow("");
  };

  const handleDeleteRow = async (id: String) => {
    await dispatch(deleteExpenses(id));
    fetchData();
  };

  const total = (items: readonly tableRow[]) => {
    return items.map(({ price }) => price ?? 0).reduce((sum, i) => sum + i, 0);
  };

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
    <>
      <TableContainer
        component={Paper}
        style={{ backgroundColor: "transparent", color: "white" }}
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
                {total(row)}
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
      </div>

      {/* {open && (
        <DynamicModal
          open={open}
          setOpen={setOpen}
          title="Add Your Expenses"
          btnTitle="Submit"
          btnAction={handleAddExpense}
          component={
            <AddNewExpense formData={formData} setFormData={setFormData} />
          }
        />
      )} */}
    </>
  );
}
