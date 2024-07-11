"use client";
import MainDemoPage from "@/components/Demo/MainDemoPage";
import DynamicThemeProvider from "@/themeprovider/DynamicThemeProvider";
import React from "react";

const DemoPage = () => {
  return (
    <>
      <DynamicThemeProvider>
        <MainDemoPage />
      </DynamicThemeProvider>
    </>
  );
};

export default DemoPage;
