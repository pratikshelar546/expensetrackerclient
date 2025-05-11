import ExpensesTable from "@/components/ManageExpenses/ExpensesTable";
import CustomProvider from "@/CustomProvider/CustomProvider";
import React, { Suspense } from "react";

const page = ({ params }: { params: { id: string } }) => {

  return (
    <>
      <Suspense fallback={<div className="w-full h-full min-h-screen text-3xl text-white flex items-center justify-center">Loading all expenses...</div>}>
        <CustomProvider>
          <ExpensesTable id={params.id} />

        </CustomProvider>
      </Suspense>
    </>
  );
};

export default page;
