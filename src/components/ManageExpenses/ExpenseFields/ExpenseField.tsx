"use client";
import { expenseField } from "@/assets/commanInterface/ComonInterface";
import { createField, deleteField, getField } from "@/Redux/Slices/FieldSlice";
import React, { useEffect, useState } from "react";
import ExpensesTable from "../ExpensesTable";
import { useAppDispatch } from "../../../../Hooks";
import { AddFieldModal } from "./AddFieldModal";
import { ExpandableCardDemo } from "../ExpandableCard/ExpandableCard";

const ExpenseField = () => {
  const [fieldId, setFieldId] = useState<expenseField[]>([]);
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const fetchFieldData = async () => {
    const fields = await dispatch(getField());

    if (getField.fulfilled.match(fields)) {
      setFieldId(fields.payload);
    }
  };

  // function call for fetchfield
  useEffect(() => {
    fetchFieldData();
  }, []);

  const toggleOpen = (id: string) => {
    if (isOpen === id) {
      setIsOpen(null);
    } else {
      setIsOpen(id);
    }
  };

  useEffect(() => {
    if (fieldId && fieldId.length > 0 && !isOpen) {
      setIsOpen(fieldId[0]?._id);
    }
  }, [fieldId]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteField(id));

    await fetchFieldData();
  };

  return (
    <>
      <AddFieldModal fetchFieldData={fetchFieldData} />
      <ExpandableCardDemo field={fieldId} handleDeleteField={handleDelete} />
    </>
  );
};

export default ExpenseField;
