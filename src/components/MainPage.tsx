"use client";
import React, { useEffect } from "react";
// import tracker from "@/assets/icons/tracker.svg";
// import { Spotlight } from "./UI/Spotlight";
import { BackgroundBeams } from "./UI/background-beans";
import * as motion from "framer-motion/client";
const MainPage = () => {



  return (
    <div className="text-white mt-14 flex items-center justify-center h-full antialiased">
      {/* <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#ffe4e4"
        /> */}
      <div className="flex max-w-6xl items-center justify-between h-[80vh] z-[1]">
        <motion.h1
          initial={{ y: -50, x: -50, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-5xl text-center"
        >
          Streamline finances with ExpenseWise Track,categorize,and manage
          expenses easily
        </motion.h1>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default MainPage;
