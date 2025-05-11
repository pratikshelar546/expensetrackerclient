"use client";
import React from "react";
import * as motion from "framer-motion/client";
import Image from "next/image";
import sideImage from "../assets/icons/image.png";
import { Button } from "@/CommonComponent/UI/moving-border";
import { useRouter } from "next/navigation";
const MainPage = () => {
  const router = useRouter();
  return (
    <main className="w-full min-h-screen flex flex-col items-center overflow-x-hidden overflow-y-hidden">
      <section className="relative w-full h-full min-h-[calc(100vh-1.5rem)] flex flex-col items-center justify-start border-b border-blue-500/50 mt-4 max-w-6xl">
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
              Manage Your <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600">Expenses</span>{" "}
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
                onClick={() => router.push("/expensepool")}
                borderRadius="1.75rem"
                className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-600 hover:to-blue-800 text-white text-lg font-semibold px-20 py-3 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Add Expense
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-400 via-blue-600  to-blue-400 opacity-30 blur-3xl pointer-events-none z-0"></div>
      </section>
    </main>
  );
};

export default MainPage;
