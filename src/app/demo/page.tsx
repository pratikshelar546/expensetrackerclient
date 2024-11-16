import MainDemoPage from "@/components/Demo/MainDemoPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import React, { Suspense } from "react";

const DemoPage = () => {
  return (
    <>
      {/* <DynamicThemeProvider> */}
      {/* <Suspense
        fallback={
          <p className="text-red-400 w-screen h-screen bg-white">
            Loading Main page...
          </p>
        }
      > */}
        <CustomProvider>
          <MainDemoPage />
        </CustomProvider>
      {/* </Suspense> */}
      {/* </DynamicThemeProvider> */}
    </>
  );
};

export default DemoPage;
