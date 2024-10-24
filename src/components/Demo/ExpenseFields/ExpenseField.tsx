import { expenseField } from "@/assets/commanInterface/ComonInterface";
import { createField, getField } from "@/Redux/Slices/FieldSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ExpensesTable from "../ExpensesTable";
import { useAppDispatch } from "../../../../Hooks";

const ExpenseField = () => {
  const [fieldId, setFieldId] = useState<expenseField[]>([]);
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleCreateFeild = async () => {
    const data = { fieldName: "hello" };
    const fieldCreated = await dispatch(createField(data));
  };

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

  console.log(fieldId);

  return (
    <>
      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,rgba(2,6,23,var(--tw-bg-opacity)),45%,#1e2631,55%,rgba(2,6,23,var(--tw-bg-opacity)))] bg-[length:200%_100%] bg-opacity-100 px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mb-5">
        {fieldId ? "Add Anoter Field" : "Add New Field"}
      </button>

      {fieldId &&
        fieldId.map((feild) => (
          <>
            <div
              className=" border p-2 border-slate-400 mb-5 rounded-md"
              onClick={() => setIsOpen(feild._id)}
            >
              <h1 className="text-white px-4">{feild.fieldName}</h1>
              
                <ExpensesTable fieldId={feild._id} key={feild._id} isOpen={isOpen}/>
              
              {/* <div className=" w-full border-dashed border-[1px] border-white"></div> */}
            </div>
          </>
        ))}
    </>
  );
};

export default ExpenseField;
