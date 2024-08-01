import React from "react";
import ExpensesTable from "./ExpensesTable";

const MainDemoPage = () => {
  return (
    <div className="mt-24  flex items-center justify-center">
      <div className="w-2/4 max-w-6xl">
        <ExpensesTable />
      </div>
    </div>
  );
};

export default MainDemoPage;
