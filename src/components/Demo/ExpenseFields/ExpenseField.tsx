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
    console.log("trigger");

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

    fetchFieldData();
  };

  console.log();

  return (
    <>
      <AddFieldModal />
      <ExpandableCardDemo field={fieldId} handleDeleteField = {handleDelete} />

      {/* {fieldId &&
        fieldId.map((feild) => (
          <div
            key={feild._id}
            className=" border p-2 border-slate-400 mb-5 rounded-md"
          >
            <div
              className="flex justify-between"
              onClick={() => toggleOpen(feild._id)}
            >
              <h1 className="text-white px-4">{feild.fieldName}</h1>

              <button
                className="text-white px-4 cursor-pointer outline-none"
                onClick={() => handleDelete(feild._id)}
              >
                Delete Field
              </button>
            </div>

            <ExpensesTable field={feild} key={feild._id} isOpen={isOpen} />
          </div>
        ))} */}
    </>
  );
};

export default ExpenseField;
