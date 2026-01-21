"use client";
import { expenseFieldData } from "@/assets/commanInterface/ComonInterface";
import { getField } from "@/Redux/Slices/FieldSlice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../Hooks";
import { ExpandableCardDemo } from "../ExpandableCard/ExpandableCard";
import { AddFieldModal } from "./AddFieldModal";

const ExpenseField = () => {


  const { data: session, status } = useSession();
  const token = session?.user?.token || undefined;
  const [field, setField] = useState<expenseFieldData[]>([]);

  const dispatch = useAppDispatch();

  const fetchFieldData = async () => {
    const fields = await dispatch(getField({ token: token }));
    if (getField.fulfilled.match(fields)) {
      setField(fields.payload);
    }
  };

  // function call for fetchfield
  useEffect(() => {
    if (status !== "loading") {

      fetchFieldData();
    }
  }, [token]);




  return (
    <>
      <AddFieldModal fetchFieldData={fetchFieldData} />
      <ExpandableCardDemo field={field} />
    </>
  );
};

export default ExpenseField;
