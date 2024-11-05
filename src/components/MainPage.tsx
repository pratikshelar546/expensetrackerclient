"use client";
import React, { useEffect } from "react";
// import tracker from "@/assets/icons/tracker.svg";
// import { Spotlight } from "./UI/Spotlight";
import { BackgroundBeams } from "../CommonComponent/UI/background-beans";
import * as motion from "framer-motion/client";
import Image from "next/image";
import sideImage from "../assets/icons/image.png";
import { Spotlight } from "@/CommonComponent/UI/Spotlight";
const MainPage = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center overflow-x-hidden overflow-y-hidden">
        {/* <Spotlight
        className="top-40 left-0 md:left-60 md:-top-20"
        fill="wheat"
        /> */}
      <section className="relative w-full h-full min-h-[calc(100vh-3.6rem)] flex flex-col items-center justify-start border-b border-blue-500/50 mt-14 max-w-6xl">
        {/* -z-10 absolute -top-10 left-[calc(40%)] w-[100%] h-[calc(100vh-12rem)] */}
        <div className="-z-10 absolute left-[calc(20%)] w-[100%] h-[calc(100vh-12rem)]">
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src={sideImage}
              alt="new"
              className=" absolute inset-0 h-full w-4/5 object-left-top object-contain"
            ></Image>
          </div>
          <div className="absolute inset-0 imggradiant"></div>
        </div>
        <div className="text-white max-h-[calc(100vh-16rem)] w-full grow px-4 mx-4 flex flex-col justify-center gap-6">
          <div className="w-full max-w-xl">
            <motion.h1
              initial={{ y: -50, x: -50, opacity: 0 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.75 }}
              className="text-5xl font-extrabold  px-4 text-left"
            >
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
        </div>
        {/* <div className="flex max-w-6xl items-center justify-between h-[80vh] z-[1] w-full">
        <div className="relative w-full h-full flex items-center">
          <div className="flex flex-col gap-3 w-2/5 z-[1] ">
            <motion.h1
              initial={{ y: -50, x: -50, opacity: 0 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.75 }}
              className="text-5xl font-extrabold  px-4 text-left"
            >
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
          <div className="absolute  w-4/5 right-0 h-full">
              <Image src={sideImage} alt="new" className=" absolute inset-0 "></Image>
            
            <div className="absolute imggradiant"></div>
          </div>
        </div>
      </div> */}
        {/* <BackgroundBeams />  */}
      </section>
    </main>
  );
};

export default MainPage;
