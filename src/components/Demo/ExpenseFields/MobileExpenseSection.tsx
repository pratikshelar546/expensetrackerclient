import {
  expenseField,
  tableRow,
} from "@/assets/commanInterface/ComonInterface";
import useFormatDate from "@/Hooks/useFormatDate";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MobileExpenseSection = ({
  row,
  setRow,
  handleDeleteRow,
  fetchAllExpenses,
  field,
  handleUpdateRow,
}: {
  row: tableRow[];
  handleDeleteRow: (id: string) => Promise<void>;
  fetchAllExpenses: (fieldId: string) => Promise<void>;
  field: expenseField;
  setRow: Dispatch<SetStateAction<tableRow[]>>;
  handleUpdateRow: (id: string) => Promise<void>;
}) => {
  const [isEditable, setIsEditable] = useState(false);
  console.log(row);

  const handleEditRow = (id: string) => {};

  return (
    <section className="text-white px-4 h-full max-h-[78vh] overflow-y-auto">
      {row.map((expense) => (
        <div key={expense._id}>
          <div className="flex justify-between">
            <h1>Category:</h1>
            <p>{expense.category}</p>
          </div>
          <div className="flex justify-between">
            <h1>Description:</h1>
            <p>{expense.desc}</p>
          </div>
          <div className="flex justify-between">
            <h1>Price:</h1>
            <p>{expense.price}</p>
          </div>
          <div className="flex justify-between">
            <h1>Date:</h1>
            {/*  eslint-disable-next-line react-hooks/rules-of-hooks */}
            <p>{useFormatDate(expense?.date)}</p>
          </div>
          <div className="flex justify-center items-center gap-10">
            {isEditable ? (
              <FaRegSave
                color="white"
                size={"1.5em"}
                onClick={() => handleUpdateRow(expense._id)}
              />
            ) : (
              <CiEdit
                color="white"
                size={"1.5em"}
                onClick={() => handleEditRow(expense._id)}
              />
            )}
            <MdDelete
              color="white"
              size={"1.5em"}
              onClick={() => handleDeleteRow(expense._id)}
            />
          </div>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </div>
      ))}
    </section>
  );
};

export default MobileExpenseSection;
