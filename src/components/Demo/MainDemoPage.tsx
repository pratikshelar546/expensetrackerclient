import React from "react";
import ExpensesTable from "./ExpensesTable";

const MainDemoPage = () => {
  return (
    <div className="mt-24  flex items-center justify-center">
      <div className="lg:w-full w-full lg:max-w-6xl max-w-full p-4">
        <ExpensesTable />
      </div>
    </div>
  );
};

export default MainDemoPage;
