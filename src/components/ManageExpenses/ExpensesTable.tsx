"use client";
import CommanExpensesTable from "@/CommonComponent/ExpenseTable/ExpenseTable";
import FLoatingButton from "@/CommonComponent/FLoatingButton";
import useCheckDeviceView from "@/Hooks/useDeviceCheck";
import {
  addExpense,
  deleteExpenses,
  getAllExpenses,
  updateExpense,
} from "@/Redux/Slices/ExpensesSlice";
import {
  deleteField,
  getFieldById,
  updateField,
} from "@/Redux/Slices/FieldSlice";
import {
  expenseField,
  expenseFormData,
  tableRow,
} from "@/assets/commanInterface/ComonInterface";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../Hooks";

export default function ExpensesTable({ id }: { id: string }) {
  const darkMode = true;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [row, setRow] = useState<tableRow[]>([]);
  const [editableRow, setEditableRow] = useState<string>("");
  const isMobile = useCheckDeviceView();
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [field, setField] = useState<expenseField>({
    _id: "",
    fieldName: "",
    RecivedAmount: 0,
    balance: null,
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<expenseFormData>({
    desc: "",
    date: null,
    category: "",
    price: NaN,
  });
  const { data: session, status } = useSession();
  const token = session?.user?.token || undefined;

  // fetch all expenses for all the field
  const fetchAllExpenses = async (fieldId: string) => {
    const response = await dispatch(
      getFieldById({ id: fieldId, token: token })
    );

    if (getFieldById.fulfilled.match(response)) {
      setField(response.payload.field);
      setRow(response.payload.field.expenses as tableRow[]);
    }

    if (getAllExpenses.fulfilled.match(response)) {
      setRow(response.payload.expensesList as tableRow[]);
    }

  };

  useEffect(() => {
    if (status !== "loading") {
      fetchAllExpenses(id);
    }
  }, [status, id]);

  const totalAmount = row?.reduce((sum, { price = 0 }) => sum + price, 0);
  const fieldBalance = (field.RecivedAmount ?? 0) - totalAmount;

  const handleDeleteField = async (id: string) => {
    await dispatch(deleteField({ id, token }));
    router.push("/demo");
  };

  const handleAddExpense = async () => {
    const res = await dispatch(
      addExpense({
        data: formData,
        id: field._id,
        token: token,
      })
    );
    if (addExpense.fulfilled.match(res)) {
      toast.success(res.payload.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error((res.payload as { message: string }).message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    await fetchAllExpenses(field._id);
    setOpen((value) => !value);
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
    setOpenStates({ [categories[0]]: true });
  }, [categories]);

  return (
    <>
      <CommanExpensesTable id={id} fetchAllExpenses={fetchAllExpenses} row={row} setRow={setRow} field={field} setField={setField} formData={formData} setFormData={setFormData} handleAddExpense={handleAddExpense} handleDeleteField={handleDeleteField} handleDeleteRow={handleDeleteRow} handleUpdateRow={handleUpdateRow} />
      <FLoatingButton field={field} fetchAllExpenses={fetchAllExpenses}/>
    </>
  );
}
