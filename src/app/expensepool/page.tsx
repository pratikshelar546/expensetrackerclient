import MainDemoPage from "@/components/ManageExpenses/MainDemoPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import React, { Suspense } from "react";

const DemoPage = () => {
  return (
    <>
      {/* <DynamicThemeProvider> */}
      <Suspense fallback={<div className="w-full h-full min-h-screen text-3xl text-white flex items-center justify-center">Loading all expenses...</div>}>
        <CustomProvider>
          <MainDemoPage />
        </CustomProvider>
      </Suspense>
      {/* </DynamicThemeProvider> */}
    </>
  );
};

export default DemoPage;
