"use client";
import React from "react";
import * as motion from "framer-motion/client";
import Image from "next/image";
import sideImage from "../assets/icons/image.png";
import { Button } from "@/CommonComponent/UI/moving-border";
const MainPage = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center overflow-x-hidden overflow-y-hidden">
      <section className="relative w-full h-full min-h-[calc(100vh-3.6rem)] flex flex-col items-center justify-start border-b border-blue-500/50 mt-14 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5, // Longer duration for a smoother fade
            ease: "easeInOut", // Smooth easing for fade effect
            delay: 1,
          }}
          className="-z-10 absolute w-full  h-[calc(100vh-3rem)]"
        >
          <motion.div className="absolute inset-0 flex h-full justify-center items-center">
            <Image
              src={sideImage}
              alt="new"
              className=" absolute inset-0 h-[calc(100vh-3rem)] w-full opacity-30"
            />
          </motion.div>
          <div className="absolute inset-0 imggradiant h-full w-full"></div>
        </motion.div>
        <div className="text-white max-h-[calc(100vh-16rem)] top-5 relative w-full grow px-4 mx-4 flex flex-col justify-center gap-6">
          <div className="w-full justify-center items-center gap-5 flex flex-col">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale:1.07 }}
              transition={{ ease: [0.42, 0, 0.58, 1], duration: 0.5, delay: 1.2 }}
              className="text-5xl lg:text-5xl font-extrabold  px-4 "
            >
              Manage Your <span className="text-blue-400">expenses </span>
              Smartly.
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeIn", duration: 0.5, delay: 0.6 }}
              className="text-lg font-medium px-4 max-w-4xl text-center"
            >
              Effortlessly manage daily expenses, collaborate with your team,
              and track monthly household budgets. Stay organized and in control
              of your finances with ease and efficiency.
            </motion.p>
            <div className="flex gap-5 left-4 relative overflow-hidden">

              <Button 
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                Get Started
              </Button>
             
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
