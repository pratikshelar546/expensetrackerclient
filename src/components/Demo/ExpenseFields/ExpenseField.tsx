import { expenseField } from "@/assets/commanInterface/ComonInterface";
import { createField, getField } from "@/Redux/Slices/FieldSlice";
import React, { useEffect, useState } from "react";
import ExpensesTable from "../ExpensesTable";
import { useAppDispatch } from "../../../../Hooks";
import { AddFieldModal } from "./AddFieldModal";

const ExpenseField = () => {
  const [fieldId, setFieldId] = useState<expenseField[]>([]);
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  // const handleCreateFeild = async () => {
  //   const data = { fieldName: "hello" };
  //   await dispatch(createField(data));
  // };

  // fetch all fields here
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

  useEffect(() => {
    if (fieldId && fieldId.length > 0 && !isOpen) {
      setIsOpen(fieldId[0]?._id);
    }
  }, [fieldId]);

  const handleAddField = () => {};

  return (
    <>
      <AddFieldModal />
 
      {fieldId &&
        fieldId.map((feild) => (
          <div
            key={feild._id}
            className=" border p-2 border-slate-400 mb-5 rounded-md"
            onClick={() => setIsOpen(feild._id)}
          >
            <h1 className="text-white px-4">{feild.fieldName}</h1>

            <ExpensesTable
              fieldId={feild._id}
              key={feild._id}
              isOpen={isOpen}
            />

            {/* <div className=" w-full border-dashed border-[1px] border-white"></div> */}
          </div>
        ))}
    </>
  );
};

export default ExpenseField;
