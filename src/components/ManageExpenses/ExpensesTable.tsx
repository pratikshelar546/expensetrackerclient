"use client";
import { useEffect, useState } from "react";
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
import { CiEdit, CiReceipt } from "react-icons/ci";
import { FaRegSave, FaTag } from "react-icons/fa";
import { MdDelete, MdEmojiTransportation, MdFoodBank } from "react-icons/md";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { InputAdornment, NativeSelect, Tab, TextField } from "@mui/material";
import { toast } from "react-toastify";
import {
  deleteField,
  getFieldById,
  updateField,
} from "@/Redux/Slices/FieldSlice";
import MobileExpenseSection from "./ExpenseFields/MobileExpenseSection";
import useCheckDeviceView from "@/Hooks/useDeviceCheck";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useFormatDate from "@/Hooks/useFormatDate";
import { motion } from 'framer-motion';
import { IoFastFoodOutline } from "react-icons/io5";

export default function ExpensesTable({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [row, setRow] = useState<tableRow[]>([]);
  const [editableRow, setEditableRow] = useState<string>("");
  const isMobile = useCheckDeviceView();
  const [field, setField] = useState<expenseField>({
    _id: "",
    fieldId: "",
    fieldName: "",
    RecivedAmount: 0,
    balance: null,
  });
  const { data: session, status } = useSession();
  const token = session?.user?.token || undefined

  // fetch all expenses for all the field
  const fetchAllExpenses = async (fieldId: string) => {
    const response = await dispatch(getFieldById({ id: fieldId, token: token }));

    if (getFieldById.fulfilled.match(response)) {
      setField(response.payload.field);
      setRow(response.payload.field.expenses as tableRow[]);
    }

    if (getAllExpenses.fulfilled.match(response)) {
      setRow(response.payload.expensesList as tableRow[]);
    }
  };
  console.log(status);


  useEffect(() => {
    if (status !== 'loading') {

      fetchAllExpenses(id);
    }
  }, [token]);

  const totalAmount = row?.reduce((sum, { price = 0 }) => sum + price, 0);
  const fieldBalance = (field.RecivedAmount ?? 0) - totalAmount;

  const handleDeleteField = async (id: string) => {
    await dispatch(deleteField({ id, token }));
    router.push("/demo");
  };

  const handleAddExpenseClick = () => {
    const hasNewRow = row.some((rows) => rows._id === "newRow");

    if (hasNewRow) {
      toast.error("Save the new expense before adding another.");
      return;
    } else {
      setRow((oldRow: tableRow[]) => [
        ...oldRow,
        {
          _id: "newRow",
          desc: "",
          category: "Transport",
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
        console.log("here");

        await dispatch(
          addExpense({
            data: rest,
            id: field._id,
          })
        );
        setRow((prevRow) => prevRow.filter((r) => r._id !== "newRow"));
        await fetchAllExpenses(field._id);
      }
    } else {
      const updateRow = row.find((row) => row._id === id);
      if (updateRow) {
        const { _id, ...rest } = updateRow;
        await dispatch(updateExpense({ data: rest, id }));
        fetchAllExpenses(field._id);
      }
    }
    setEditableRow("");
  };

  const handleDeleteRow = async (id: string) => {
    const deletedRow = row.find((r) => r._id === id);

    if (deletedRow) {
      // Delete the expense in the database
      await dispatch(deleteExpenses(id));

      // Update the local row state by filtering out the deleted row
      setRow((prevRows) => prevRows.filter((r) => r._id !== id));

      // Recalculate totalAmount and fieldBalance locally after deletion
      const newTotalAmount = row
        .filter((r) => r._id !== id)
        .reduce((sum, { price = 0 }) => sum + price, 0);
      const newBalance = (field.RecivedAmount ?? 0) - newTotalAmount;

      const updatedField = { ...field, balance: newBalance };
      await dispatch(updateField({ data: updatedField, id: field._id, token }));
    }
  };

  const textFieldStyle = {
    "& .MuiInputBase-input": {
      color: "white",
      padding: "4px !important",
      textAlign: "right",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
      },
    },
    "& .MuiIconButton-root": {
      color: "white",
    },
  };
  const darkMode = true
  return (

    <>
      {status !== 'authenticated' ? <>

      </> :
        <>
          <div className="w-full flex justify-center items-center">

            <div className="grid gap-6 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 text-white top-16 relative w-full max-w-7xl px-4">
              {row.map((expense) => {
                const isEditable = expense._id === editableRow;
                return (
                  <motion.div
                    key={expense._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className='rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg bg-neutral-900 hover:bg-neutral-950 '>
                    <div className="flex flex-col space-y-4 justify-between h-full">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-full`}>
                            <CiReceipt className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                          </div>
                          <div>
                            {isEditable ? <input
                              value={expense.desc}
                              onChange={(e) => handleRowChange(expense._id, "desc", e.target.value)}
                              className="w-32 text-sm bg-transparent border-b border-gray-600 text-white outline-none"
                            /> : <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {expense.desc}
                            </h3>}
                            <div className="flex items-center mt-1 space-x-2">
                              {expense.category === 'Food' ? <IoFastFoodOutline className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} /> :expense.category === 'Transport'? <MdEmojiTransportation className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />:<FaTag className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />}

                              {isEditable ? <NativeSelect
                                name="category"
                                value={expense.category}
                                onChange={(e) => handleRowChange(expense._id, "category", e.target.value)}
                                className="text-sm bg-transparent !text-white border-none outline-none"
                              >
                                <option value="Transport" className="text-black">Transport</option>
                                <option value="Food" className="text-black">Food</option>
                                <option value="Other Expenses" className="text-black">Other Expenses</option>
                              </NativeSelect> : <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {expense.category}
                              </span>}
                            </div>
                          </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex justify-center items-center gap-4 h-full">
                          {isEditable ? (
                            <FaRegSave
                              color={darkMode ? "white" : "black"}
                              size={"1.5em"}
                              onClick={() => handleUpdateRow(expense._id)}
                              className="cursor-pointer hover:scale-105 transition"
                            />
                          ) : (
                            <CiEdit
                              color={darkMode ? "white" : "black"}
                              size={"1.5em"}
                              onClick={() => handleEditRow(expense._id)}
                              className="cursor-pointer hover:scale-105 transition"
                            />
                          )}
                          <MdDelete
                            color={darkMode ? "white" : "black"}
                            size={"1.5em"}
                            onClick={() => handleDeleteRow(expense._id)}
                            className="cursor-pointer hover:scale-105 transition"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-end pt-2 border-t border-gray-200 dark:border-gray-700">
                        {isEditable ? (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={textFieldStyle}
                              format="DD/MM/YYYY"
                              className="w-36 bg-black text-white"
                              value={dayjs(new Date(expense.date))}
                              onChange={(newValue) => handleRowChange(expense._id, "date", newValue)}
                              slotProps={{ textField: { fullWidth: true } }}
                            />
                          </LocalizationProvider>
                        ) : <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {useFormatDate(new Date(expense.date))}
                        </p>}
                        {isEditable ? (<TextField
                          type="number"
                          value={expense.price === 0 ? "" : expense.price}
                          sx={textFieldStyle}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <span style={{ color: "white" }}>₹</span>
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => handleRowChange(expense._id, "price", Number(e.target.value))}
                          fullWidth
                        />) : <p className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          ₹{expense?.price?.toFixed(2)}
                        </p>}
                      </div>
                    </div>
                  </motion.div>

                );
              })}
            </div>
          </div>

          <div className="md:px-12 px-2 w-full flex justify-between items-center bottom-0 relative  gap-3">
            {fieldBalance && (
              <h1 className="text-white border border-gray-400 py-2 px-4   rounded-xl relative right-0">
                Balance : {fieldBalance}
              </h1>
            )}
            <button
              className=" cursor-pointer outline-none text-white border border-gray-400 py-2 px-4 hover:bg-gray-300 hover:text-neutral-900 rounded-xl relative right-0 "
              onClick={() => {
                handleDeleteField(field._id);
                // setActive(false);
              }}
            >
              Delete Field
            </button>
            <button
              className="text-white border border-gray-400 py-2 px-4 hover:bg-gray-300 hover:text-neutral-900 rounded-xl relative right-0 "
              onClick={handleAddExpenseClick}
            >
              Add Expense
            </button>
          </div>
        </>}
    </>
  );
}
