"use client";
import React, { useEffect } from "react";
// import tracker from "@/assets/icons/tracker.svg";
// import { Spotlight } from "./UI/Spotlight";
import { BackgroundBeams } from "../CommonComponent/UI/background-beans";
import * as motion from "framer-motion/client";
import Image from "next/image";
const MainPage = () => {



  return (
    <div className="text-white mt-14 flex items-center justify-center h-full antialiased">
      {/* <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#ffe4e4"
        /> */}
      <div className="flex max-w-6xl items-center justify-between h-[80vh] z-[1] w-full relative">
        <div className="flex flex-col gap-3 w-2/5">

        <motion.h1   initial={{ y: -50, x: -50, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-5xl font-extrabold  px-4 text-left">
          Manage your expenses
        </motion.h1>
        <motion.p
          initial={{ y: -50, x: -50, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-xl font-extrabold text-left px-4"
          >
          Streamline finances with ExpenseWise Track,categorize,and manage
          expenses easily
        </motion.p>
          </div>
          <div>
            {/* <Image src={graphimg} alt="new"  className=""></Image> */}
          </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default MainPage;
