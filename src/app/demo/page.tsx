"use client";
import MainDemoPage from "@/components/Demo/MainDemoPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import React from "react";

const DemoPage = () => {
  return (
    <>
      {/* <DynamicThemeProvider> */}
        <CustomProvider>
          <MainDemoPage />
        </CustomProvider>
      {/* </DynamicThemeProvider> */}
    </>
  );
};

export default DemoPage;
