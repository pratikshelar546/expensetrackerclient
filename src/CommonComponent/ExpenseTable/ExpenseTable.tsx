"use client";
import DynamicModal from "@/CommonComponent/DynamicModal";
import SignInBtn from "@/CommonComponent/SignInBtn";
import {
    expenseField,
    expenseFormData,
    tableRow,
} from "@/assets/commanInterface/ComonInterface";
import AddNewExpense from "@/components/ManageExpenses/AddNewExpense";
import {
    CATEGORY_GROUPS,
    CategoryGroup,
    EXPENSE_CATEGORIES,
    getCategoryDotClass,
    getCategoryGroup,
} from "@/constants/expenseCategories";
import { InputAdornment, NativeSelect, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CiEdit, CiReceipt } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import TeamBadge from "@/CommonComponent/UI/TeamBadge";

const TEXT_FIELD_STYLE = {
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
} as const;

function formatShortDate(date: Date | string) {
    return dayjs(date).format("D MMM");
}

export default function CommanExpensesTable({
    id,
    fetchAllExpenses,
    row,
    setRow,
    field,
    handleAddExpense,
    formData,
    setFormData,
    handleDeleteField,
    handleUpdateRow,
    handleDeleteRow,
}: {
    id?: string;
    fetchAllExpenses: (fieldId: string) => Promise<void>;
    row: tableRow[];
    setRow: React.Dispatch<React.SetStateAction<tableRow[]>>;
    field: expenseField;
    setField: (field: expenseField) => void;
    handleAddExpense: () => Promise<void>;
    formData: expenseFormData;
    setFormData: React.Dispatch<React.SetStateAction<expenseFormData>>;
    handleDeleteField: (id: string) => void;
    handleUpdateRow: (id: string) => void;
    handleDeleteRow: (id: string) => void;
}) {
    const [editableRow, setEditableRow] = useState<string>("");
    const [openStates, setOpenStates] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== "loading" && id) {
            fetchAllExpenses(id);
        }
    }, [status, id]);

    const totalAmount = useMemo(
        () => row?.reduce((sum, { price = 0 }) => sum + (price || 0), 0) || 0,
        [row]
    );

    const budget = field.RecivedAmount ?? 0;
    const budgetUsedPercent = budget > 0 ? Math.min((totalAmount / budget) * 100, 100) : 0;

    const now = dayjs();
    const monthLabel = now.format("MMMM YYYY");
    const monthRange = `${now.startOf("month").format("D MMM")} — ${now.endOf("month").format("D MMM")}`;
    const fieldTypeLabel = field.fieldType || "Personal";

    const categories = useMemo(() => {
        if (!row?.length) return [];
        const uniqueCategories = new Set<string>();
        row.forEach((item) => {
            if (item.category) uniqueCategories.add(item.category);
        });
        return Array.from(uniqueCategories);
    }, [row]);

    useEffect(() => {
        if (categories.length > 0 && !openStates) {
            setOpenStates(categories[0]);
        }
    }, [categories, openStates]);

    const expensesByCategory = useMemo(() => {
        const grouped = new Map<string, tableRow[]>();
        row?.forEach((expense) => {
            const category = expense.category || "Other Expenses";
            if (!grouped.has(category)) grouped.set(category, []);
            grouped.get(category)!.push(expense);
        });
        return grouped;
    }, [row]);

    const categoryStats = useMemo(() => {
        const stats = new Map<string, { count: number; total: number }>();
        categories.forEach((category) => {
            const expenses = expensesByCategory.get(category) || [];
            stats.set(category, {
                count: expenses.length,
                total: expenses.reduce((sum, e) => sum + (e.price || 0), 0),
            });
        });
        return stats;
    }, [categories, expensesByCategory]);

    const groupTotals = useMemo(() => {
        const totals: Record<CategoryGroup, number> = {
            NEEDS: 0,
            WANTS: 0,
            SAVINGS: 0,
        };
        row?.forEach((expense) => {
            const group = getCategoryGroup(expense.category || "Other Expenses");
            totals[group] += expense.price || 0;
        });
        return totals;
    }, [row]);

    const handleRowChange = useCallback(
        (rowId: string, fieldName: keyof tableRow, value: unknown) => {
            setRow((prevRows) =>
                prevRows.map((r) =>
                    r._id === rowId ? { ...r, [fieldName]: value } : r
                )
            );
        },
        [setRow]
    );

    const handleEditRow = useCallback((rowId: string) => {
        setEditableRow((prev) => (prev === rowId ? "" : rowId));
    }, []);

    const toggleCategory = useCallback((category: string) => {
        setOpenStates((prev) => (prev === category ? "" : category));
    }, []);

    const toggleModal = useCallback(() => setOpen((prev) => !prev), []);

    const handleModalClose = useCallback(async () => {
        await handleAddExpense();
        setOpen(false);
    }, [handleAddExpense]);

    const switchToChatMode = () => router.push(`/chat/${id}`);

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
                    btnAction={handleModalClose}
                />
            )}
            {status !== "authenticated" ? (
                <>
                    <h1 className="font-bold text-2xl text-white w-full text-center">
                        Sign in first to add expense
                    </h1>
                    <SignInBtn />
                </>
            ) : (
                <div className="min-h-screen bg-black text-white pt-20 pb-32">
                    <div className="mx-auto w-full max-w-6xl px-4">
                        {/* Header */}
                        <div className="mb-8 flex items-start justify-between gap-4">
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                        {field.fieldName || monthLabel}
                                    </h1>
                                    {field.fieldType === "Team" && <TeamBadge />}
                                </div>
                                <p className="mt-1 text-sm text-neutral-500">
                                    {monthRange} · {fieldTypeLabel}
                                    {field.fieldType === "Team" && " · Shared group expenses"}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold sm:text-4xl">
                                    ₹{totalAmount.toLocaleString("en-IN")}
                                </p>
                                <p className="text-sm text-neutral-500">
                                    of ₹{budget.toLocaleString("en-IN")} budget
                                </p>
                                <div className="mt-2 h-1 w-28 overflow-hidden rounded-full bg-neutral-800 sm:w-36">
                                    <div
                                        className="h-full rounded-full bg-white transition-all duration-500"
                                        style={{ width: `${budgetUsedPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Chat mode link */}
                        <div className="mb-6 flex justify-end">
                            <button
                                onClick={switchToChatMode}
                                className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-400 transition hover:bg-purple-500/20"
                            >
                                💬 Chat Mode
                            </button>
                        </div>

                        {/* Category accordions */}
                        <div className="flex flex-col gap-1">
                            {categories.map((category) => {
                                const stats = categoryStats.get(category);
                                const categoryExpenses =
                                    expensesByCategory.get(category) || [];
                                const isOpen = openStates === category;
                                const dotClass = getCategoryDotClass(category);

                                return (
                                    <div
                                        key={category}
                                        className="border-b border-neutral-800/80"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleCategory(category)}
                                            className="flex w-full items-center gap-3 py-4 text-left"
                                        >
                                            <span
                                                className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`}
                                            />
                                            <span className="flex-1 text-base font-medium text-white">
                                                {category}
                                            </span>
                                            <span className="text-sm text-neutral-500">
                                                {stats?.count || 0}{" "}
                                                {(stats?.count || 0) === 1
                                                    ? "expense"
                                                    : "expenses"}
                                            </span>
                                            <span className="min-w-[3rem] text-right text-base font-medium">
                                                ₹
                                                {(stats?.total || 0).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>
                                            {isOpen ? (
                                                <IoIosArrowUp className="ml-1 text-neutral-400" />
                                            ) : (
                                                <IoIosArrowDown className="ml-1 text-neutral-400" />
                                            )}
                                        </button>

                                        {isOpen && (
                                            <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3">
                                                {categoryExpenses.map((expense) => {
                                                    const isEditable =
                                                        expense._id === editableRow;
                                                    return (
                                                        <div
                                                            key={expense._id}
                                                            className="group rounded-xl border border-white/10 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 p-4 shadow-lg transition hover:border-white/20"
                                                        >
                                                            <div className="flex items-start justify-between gap-2">
                                                                <div className="flex min-w-0 flex-1 items-start gap-3">
                                                                    <div className="shrink-0 rounded-lg bg-blue-500/20 p-2">
                                                                        <CiReceipt className="h-5 w-5 text-blue-400" />
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        {isEditable ? (
                                                                            <>
                                                                                <input
                                                                                    value={
                                                                                        expense.desc
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleRowChange(
                                                                                            expense._id,
                                                                                            "desc",
                                                                                            e.target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    className="w-full border-b border-neutral-600 bg-transparent text-sm text-white outline-none"
                                                                                    placeholder="Description"
                                                                                />
                                                                                <NativeSelect
                                                                                    value={
                                                                                        expense.category
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleRowChange(
                                                                                            expense._id,
                                                                                            "category",
                                                                                            e.target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    className="mt-2 w-full text-xs text-neutral-400"
                                                                                >
                                                                                    {EXPENSE_CATEGORIES.map(
                                                                                        (opt) => (
                                                                                            <option
                                                                                                key={
                                                                                                    opt
                                                                                                }
                                                                                                value={
                                                                                                    opt
                                                                                                }
                                                                                            >
                                                                                                {opt}
                                                                                            </option>
                                                                                        )
                                                                                    )}
                                                                                </NativeSelect>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <p className="truncate text-base font-semibold text-white">
                                                                                    {expense.desc}
                                                                                </p>
                                                                                <p className="mt-1 text-xs text-neutral-500">
                                                                                    {formatShortDate(
                                                                                        expense.date
                                                                                    )}{" "}
                                                                                    ·{" "}
                                                                                    {expense.userName ||
                                                                                        "—"}
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex shrink-0 gap-1">
                                                                    {isEditable ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleUpdateRow(
                                                                                    expense._id
                                                                                )
                                                                            }
                                                                            className="p-1.5 text-blue-400 hover:text-blue-300"
                                                                        >
                                                                            <FaRegSave className="h-4 w-4" />
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleEditRow(
                                                                                    expense._id
                                                                                )
                                                                            }
                                                                            className="p-1.5 text-neutral-500 opacity-0 transition group-hover:opacity-100 hover:text-white"
                                                                        >
                                                                            <CiEdit className="h-4 w-4" />
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDeleteRow(
                                                                                expense._id
                                                                            )
                                                                        }
                                                                        className="p-1.5 text-neutral-500 opacity-0 transition group-hover:opacity-100 hover:text-red-400"
                                                                    >
                                                                        <MdDelete className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-3">
                                                                {isEditable ? (
                                                                    <LocalizationProvider
                                                                        dateAdapter={
                                                                            AdapterDayjs
                                                                        }
                                                                    >
                                                                        <DatePicker
                                                                            sx={TEXT_FIELD_STYLE}
                                                                            format="DD/MM/YYYY"
                                                                            className="max-w-[8rem]"
                                                                            value={dayjs(
                                                                                new Date(
                                                                                    expense.date
                                                                                )
                                                                            )}
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
                                                                    <span className="text-xs text-neutral-500">
                                                                        {formatShortDate(
                                                                            expense.date
                                                                        )}
                                                                    </span>
                                                                )}
                                                                {isEditable ? (
                                                                    <TextField
                                                                        type="number"
                                                                        size="small"
                                                                        value={
                                                                            expense.price === 0
                                                                                ? ""
                                                                                : expense.price
                                                                        }
                                                                        sx={TEXT_FIELD_STYLE}
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
                                                                                Number(
                                                                                    e.target.value
                                                                                )
                                                                            )
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <p className="text-lg font-bold text-white">
                                                                        ₹
                                                                        {(
                                                                            expense.price || 0
                                                                        ).toLocaleString(
                                                                            "en-IN"
                                                                        )}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            {categories.length === 0 && (
                                <p className="py-12 text-center text-neutral-500">
                                    No expenses yet
                                </p>
                            )}
                        </div>

                        {/* NEEDS / WANTS / SAVINGS summary cards */}
                        <div className="mt-8 grid grid-cols-3 gap-3">
                            {(Object.keys(CATEGORY_GROUPS) as CategoryGroup[]).map(
                                (group) => {
                                    const config = CATEGORY_GROUPS[group];
                                    const groupBudget = Math.round(
                                        budget * config.budgetShare
                                    );
                                    const spent = groupTotals[group];
                                    const dotClass = config.dotClass;

                                    return (
                                        <div
                                            key={group}
                                            className="rounded-2xl border border-neutral-800 bg-neutral-900/50 px-3 py-4"
                                        >
                                            <div className="mb-2 flex items-center gap-1.5">
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${dotClass}`}
                                                />
                                                <span className="text-[10px] font-medium tracking-wider text-neutral-500">
                                                    {group}
                                                </span>
                                            </div>
                                            <p className="text-lg font-bold sm:text-xl">
                                                ₹{spent.toLocaleString("en-IN")}
                                            </p>
                                            <p className="mt-1 text-xs text-neutral-500">
                                                of ₹
                                                {groupBudget.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {/* Footer actions — unchanged */}
                        <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-800 bg-black/95 px-4 py-4 backdrop-blur">
                            <div className="mx-auto flex max-w-6xl justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteField(field._id)}
                                    className="rounded-xl bg-red-500/20 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                                >
                                    Delete Field
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="rounded-xl bg-blue-500/20 px-5 py-2 text-sm text-blue-400 transition hover:bg-blue-500 hover:text-white"
                                >
                                    Add Expense
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
