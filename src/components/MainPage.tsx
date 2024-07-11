import Image from "next/image";
import React from "react";
import tracker from "@/assets/icons/tracker.svg";
const MainPage = () => {
  return (
    <div className="text-white mt-14 flex items-center justify-center">
      <div className="flex max-w-6xl items-center justify-between">
        <Image src={tracker} alt="tracker" className=" w-1/2 h-1/2" />
        <h1 className=" text-2xl ">
          Welcome to ExpenseWise! Effortlessly track expenses, set budgets, and
          gain insights with our user-friendly platform. Enjoy real-time
          updates, secure data, customizable categories, and mobile access.
          Achieve your financial goals with ease and confidence. Start managing
          your finances better with ExpenseWise today!
        </h1>
      </div>
    </div>
  );
};

export default MainPage;
