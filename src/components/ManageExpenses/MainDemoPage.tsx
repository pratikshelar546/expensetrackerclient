"use client";
import React from "react";
// import ExpensesTable from "./ExpensesTable";
import ExpenseField from "../ManageExpenses/ExpenseFields/ExpenseField";
import { ExpandableCardDemo } from "../ManageExpenses/ExpandableCard/ExpandableCard";

const MainDemoPage = () => {
  return (
    <div className="h-full w-full   flex items-center justify-center">
      <div className="lg:w-full w-full lg:max-w-6xl max-w-full p-4">
        <ExpenseField />
        {/* <ExpandableCardDemo/> */}
      </div>
    </div>
  );
};

export default MainDemoPage;
