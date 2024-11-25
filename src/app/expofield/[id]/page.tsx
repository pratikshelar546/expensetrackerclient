import ExpensesTable from "@/components/ManageExpenses/ExpensesTable";
import CustomProvider from "@/CustomProvider/CustomProvider";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
      
  return (
    <>
      <CustomProvider>
        <ExpensesTable id={params.id} />
      </CustomProvider>
    </>
  );
};

export default page;
