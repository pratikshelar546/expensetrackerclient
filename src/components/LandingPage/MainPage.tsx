"use client";
import React from "react";
import * as motion from "framer-motion/client";
import Image from "next/image";
import sideImage from "../assets/icons/image.png";
import { Button } from "@/CommonComponent/UI/moving-border";
const MainPage = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center overflow-x-hidden overflow-y-hidden">
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.8,
            ease: [0.6, 0.01, 0.5, 0.95],
            delay: 0.2
          }}
          className="-z-10 absolute w-full h-[calc(100vh-3rem)]"
        >
          <motion.div 
            className="absolute inset-0 flex h-full justify-center items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={sideImage}
              alt="Background illustration"
              className="absolute inset-0 h-[calc(100vh-3rem)] w-full opacity-40 object-cover"
              priority
              quality={100}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black h-full w-full"></div>
        </motion.div> */}
      <section className="relative w-full h-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-start border-b border-blue-500/50 mt-4 max-w-6xl">
        <div className="text-white max-h-full items-center relative w-full grow px-4 mx-4 flex flex-col justify-center gap-8">
          <div className="w-full justify-center items-center gap-6 flex flex-col">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.5 
              }}
              className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-center px-4 leading-tight"
            >
              Manage Your <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Expenses</span>{" "}
              Smartly.
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.7
              }}
              className="text-lg md:text-xl font-medium px-4 max-w-4xl text-center text-gray-300"
            >
              Effortlessly manage daily expenses, collaborate with your team,
              and track monthly household budgets. Stay organized and in control
              of your finances with ease and efficiency.
            </motion.p>
            <motion.div 
              className="flex gap-5 relative overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button 
                borderRadius="1.75rem"
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg font-semibold px-20 py-3 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Add Expense
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
