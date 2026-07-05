import ReportsPage from "@/components/Reports/ReportsPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import React, { Suspense } from "react";

const Reports = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-white">
          Loading reports...
        </div>
      }
    >
      <CustomProvider>
        <div className="min-h-screen w-full pt-24 pb-10">
          <div className="mx-auto w-full max-w-7xl px-4">
            <ReportsPage />
          </div>
        </div>
      </CustomProvider>
    </Suspense>
  );
};

export default Reports;
