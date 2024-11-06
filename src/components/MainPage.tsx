"use client";
import React, { useEffect } from "react";
import * as motion from "framer-motion/client";
import Image from "next/image";
import sideImage from "../assets/icons/image.png";
const MainPage = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center overflow-x-hidden overflow-y-hidden">
 
      <section className="relative w-full h-full min-h-[calc(100vh-3.6rem)] flex flex-col items-center justify-start border-b border-blue-500/50 mt-14 max-w-6xl">

        <div className="-z-10 absolute left-[calc(20%)] w-[100%] h-[calc(100vh-12rem)] max-w-6xl">
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src={sideImage}
              alt="new"
              className=" absolute inset-0 h-full w-4/5 object-left-top object-contain"
            ></Image>
          </div>
          <div className="absolute inset-0 imggradiant w-4/5"></div>
        </div>
        <div className="text-white max-h-[calc(100vh-16rem)] top-5 relative w-full grow px-4 mx-4 flex flex-col justify-center gap-6">
          <div className="w-full max-w-2xl gap-5 flex flex-col">
            <motion.h1
              initial={{ y: -50, x: -50, opacity: 0 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.75 }}
              className="text-5xl lg:text-6xl font-extrabold  px-4 text-left"
            >
              Manage Your <span className="text-blue-400">expenses </span>
              Smartly.
            </motion.h1>
            <motion.p
              initial={{ y: -50, x: -50, opacity: 0 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.75 }}
              className="text-lg font-semibold text-left px-4"
            > 
              Effortlessly manage daily expenses, collaborate with your team,
              and track monthly household budgets. Stay organized and in control
              of your finances with ease and efficiency.
            </motion.p>
            <div className="flex gap-5 left-4 relative">
              <button className="bg-blue-600 text-white px-3 pt-1 rounded-lg">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
       </section>
    </main>
  );
};

export default MainPage;
