"use client";
import MainDemoPage from "@/components/Demo/MainDemoPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import React, { Suspense } from "react";

const DemoPage = () => {
  return (
    <>
      <Suspense fallback={<p>Loading Main page...</p>}>
      {/* <DynamicThemeProvider> */}
        <CustomProvider>
          <MainDemoPage />
        </CustomProvider>
      {/* </DynamicThemeProvider> */}
      </Suspense>
    </>
  );
};

export default DemoPage;
