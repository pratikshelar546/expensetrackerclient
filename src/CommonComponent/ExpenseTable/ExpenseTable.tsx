"use client";
import DynamicModal from "@/CommonComponent/DynamicModal";
import SignInBtn from "@/CommonComponent/SignInBtn";
import formatDate from "@/Hooks/useFormatDate";
import {
    expenseField,
    expenseFormData,
    tableRow,
} from "@/assets/commanInterface/ComonInterface";
import AddNewExpense from "@/components/ManageExpenses/AddNewExpense";
import { InputAdornment, NativeSelect, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CiEdit, CiReceipt } from "react-icons/ci";
import { FaRegSave, FaTag } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdDelete, MdEmojiTransportation } from "react-icons/md";
import { useAppDispatch } from "../../../Hooks";

export default function CommanExpensesTable({
    id,
    fetchAllExpenses,
    row,
    setRow,
    field,
    setField,
    handleAddExpense,
    formData,
    setFormData,
    handleDeleteField,
    handleUpdateRow,
    handleDeleteRow
}: {
    id?: string;
    fetchAllExpenses: (fieldId: string) => Promise<void>;
    row: tableRow[];
    setRow: React.Dispatch<React.SetStateAction<tableRow[]>>;
    field: expenseField;
    setField: (field: expenseField) => void;
    handleAddExpense: () => Promise<void>;
    formData: expenseFormData,
    setFormData: React.Dispatch<React.SetStateAction<expenseFormData>>;
    handleDeleteField: (id: string) => void;
    handleUpdateRow: (id: string) => void;
    handleDeleteRow: (id: string) => void
}) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [editableRow, setEditableRow] = useState<string>("");
    const [openStates, setOpenStates] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession();
    const token = session?.user?.token || undefined;



    useEffect(() => {
        if (status !== "loading" && id) {
            fetchAllExpenses(id);
        }
    }, [status, id]);

    const totalAmount = row?.reduce((sum, { price = 0 }) => sum + price, 0);
    const fieldBalance = (field.RecivedAmount ?? 0) - totalAmount;


    const handleRowChange = (id: string, field: keyof tableRow, value: any) => {
        setRow((prevRows: tableRow[]) =>
            prevRows.map((row) =>
                row._id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const handleEditRow = (id: string) => {
        setEditableRow(id === editableRow ? "" : id);
    };


    const textFieldStyle = {
        "& .MuiInputBase-input": {
            color: "white",
            padding: "4px !important",
            textAlign: "right",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {},
        },
        "& .MuiIconButton-root": {
            color: "white",
        },
    };

    const categories = useMemo(
        () => [...new Set(row?.map((item) => item.category))],
        [row]
    );

    useEffect(() => {
        setOpenStates(categories[0]);
    }, [categories]);
    console.log(openStates);

    return (
        <>
            {open && (
                <DynamicModal
                    title="Add Expense"
                    open={open}
                    setOpen={setOpen}
                    component={
                        <AddNewExpense formData={formData} setFormData={setFormData} />
                    }
                    btnTitle="Add Expense"
                    btnAction={() => { handleAddExpense(); setOpen(open => !open) }}
                />
            )}
            {status !== "authenticated" ? (
                <>
                    <h1 className="font-bold text-2xl text-white w-full text-center ">
                        Sign in first to add expense
                    </h1>
                    <SignInBtn />
                </>
            ) : (
                <div className="h-full min-h-screen pt-24 flex flex-col">
                    <div className=" flex-1 ">

                        <div className="w-full flex justify-center items-start py-8">
                            <div className="flex flex-col gap-8 w-full max-w-7xl px-4">
                                {categories.map((category, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex flex-col w-full gap-4 backdrop-blur-lg bg-white/5 p-6 rounded-2xl"
                                    >
                                        <button
                                            onClick={() => {
                                                setOpenStates(category);
                                            }}
                                            className="flex items-center gap-3 text-gray-300 hover:text-white transition-all group"
                                        >
                                            <IoIosArrowDown
                                                size={"1.5em"}
                                                className={`transform transition-all duration-300 ${openStates === category ? "rotate-180" : ""
                                                    } group-hover:scale-110`}
                                            />
                                            <h1 className="font-bold text-2xl tracking-tight">
                                                {category}
                                            </h1>
                                            <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                                                {
                                                    row.filter((expense) => expense.category === category)
                                                        .length
                                                }{" "}
                                                items - ₹
                                                {row
                                                    .filter((expense) => expense.category === category)
                                                    .reduce(
                                                        (total, expense) => total + (expense.price || 0),
                                                        0
                                                    )
                                                    .toLocaleString()}
                                            </span>
                                        </button>

                                        <motion.div
                                            animate={{ height: openStates === category ? "auto" : 0 }}

                                            className="overflow-hidden"
                                        >
                                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4">
                                                {row
                                                    .filter((expense) => expense.category === category)
                                                    .map((expense) => {
                                                        const isEditable = expense._id === editableRow;
                                                        return (
                                                            <motion.div
                                                                key={expense._id}
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.95 }}
                                                                whileHover={{ scale: 1.02 }}
                                                                className="rounded-xl p-6 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
                                                            >
                                                                <div className="flex flex-col space-y-4">
                                                                    <div className="flex items-start justify-between">
                                                                        <div className="flex items-center space-x-4">
                                                                            <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
                                                                                <CiReceipt className="w-6 h-6 text-blue-400" />
                                                                            </div>
                                                                            <div>
                                                                                {isEditable ? (
                                                                                    <input
                                                                                        value={expense.desc}
                                                                                        onChange={(e) =>
                                                                                            handleRowChange(
                                                                                                expense._id,
                                                                                                "desc",
                                                                                                e.target.value
                                                                                            )
                                                                                        }
                                                                                        className="w-full text-lg bg-transparent border-b-2 border-blue-500/30 focus:border-blue-500 text-white outline-none transition-all"
                                                                                        placeholder="Description"
                                                                                    />
                                                                                ) : (
                                                                                    <h3 className="text-xl font-semibold text-white">
                                                                                        {expense.desc}
                                                                                    </h3>
                                                                                )}
                                                                                <div className="flex items-center mt-2 space-x-2">
                                                                                    {expense.category === "Food" ? (
                                                                                        <IoFastFoodOutline className="w-5 h-5 text-gray-400" />
                                                                                    ) : expense.category === "Transport" ? (
                                                                                        <MdEmojiTransportation className="w-5 h-5 text-gray-400" />
                                                                                    ) : (
                                                                                        <FaTag className="w-4 h-4 text-gray-400" />
                                                                                    )}

                                                                                    {isEditable ? (
                                                                                        <NativeSelect
                                                                                            name="category"
                                                                                            value={expense.category}
                                                                                            onChange={(e) =>
                                                                                                handleRowChange(
                                                                                                    expense._id,
                                                                                                    "category",
                                                                                                    e.target.value
                                                                                                )
                                                                                            }
                                                                                            className="text-sm bg-transparent text-white border-none outline-none"
                                                                                        >
                                                                                            <option
                                                                                                value="Transport"
                                                                                                className="text-black"
                                                                                            >
                                                                                                Transport
                                                                                            </option>
                                                                                            <option
                                                                                                value="Food"
                                                                                                className="text-black"
                                                                                            >
                                                                                                Food
                                                                                            </option>
                                                                                            <option
                                                                                                value="Other Expenses"
                                                                                                className="text-black"
                                                                                            >
                                                                                                Other Expenses
                                                                                            </option>
                                                                                        </NativeSelect>
                                                                                    ) : (
                                                                                        <span className="text-sm text-gray-400">
                                                                                            {expense.category}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex gap-2">
                                                                            {isEditable ? (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleUpdateRow(expense._id)
                                                                                    }
                                                                                    className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                                                                                >
                                                                                    <FaRegSave className="w-5 h-5 text-blue-400" />
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleEditRow(expense._id)
                                                                                    }
                                                                                    className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                                                                                >
                                                                                    <CiEdit className="w-5 h-5 text-blue-400" />
                                                                                </button>
                                                                            )}
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleDeleteRow(expense._id)
                                                                                }
                                                                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                                                                            >
                                                                                <MdDelete className="w-5 h-5 text-red-400" />
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex justify-between items-end pt-4 border-t border-white/10">
                                                                        {isEditable ? (
                                                                            <LocalizationProvider
                                                                                dateAdapter={AdapterDayjs}
                                                                            >
                                                                                <DatePicker
                                                                                    sx={textFieldStyle}
                                                                                    format="DD/MM/YYYY"
                                                                                    className="w-36"
                                                                                    value={dayjs(new Date(expense.date))}
                                                                                    onChange={(newValue) =>
                                                                                        handleRowChange(
                                                                                            expense._id,
                                                                                            "date",
                                                                                            newValue
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </LocalizationProvider>
                                                                        ) : (
                                                                            <p className="text-sm text-gray-400">
                                                                                {formatDate(new Date(expense.date))}
                                                                            </p>
                                                                        )}
                                                                        {isEditable ? (
                                                                            <TextField
                                                                                type="number"
                                                                                value={
                                                                                    expense.price === 0 ? "" : expense.price
                                                                                }
                                                                                sx={textFieldStyle}
                                                                                InputProps={{
                                                                                    startAdornment: (
                                                                                        <InputAdornment position="start">
                                                                                            <span className="text-white">
                                                                                                ₹
                                                                                            </span>
                                                                                        </InputAdornment>
                                                                                    ),
                                                                                }}
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
                                                                            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                                                                                ₹{expense?.price?.toFixed(2)}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                                {categories?.length <= 0 && (
                                    <>
                                        <h1 className="text-white text-3xl text-center">
                                            No expense found{" "}
                                        </h1>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="w-full pb-8 backdrop-blur-xl bg-black/30 border-t border-white/10 p-6">
                            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
                                {fieldBalance && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
                                        <span className="text-gray-400">Balance:</span>
                                        <span className="text-xl font-bold text-white">
                                            ₹{fieldBalance}
                                        </span>
                                    </div>
                                )}
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleDeleteField(field._id)}
                                        className="px-6 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                                    >
                                        Delete Field
                                    </button>
                                    <button
                                        onClick={() => setOpen((value) => !value)}
                                        className="px-6 py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                                    >
                                        Add Expense
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
