"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import * as motion from "framer-motion/client";


export function Header() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center top-0  fixed w-full">
      <motion.div
        initial={{ scale: 4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="flex w-full max-w-6xl text-white justify-between gap-5 items-center py-4 px-8  text-lg"
      >
        <div>
          <h3 onClick={() => router.push("/")} className=" cursor-pointer">
            ExpenseWise
          </h3>
        </div>
        <div className="flex gap-10">
          <h3>Documentation</h3>
          <h3 onClick={() => router.push("/demo")} className=" cursor-pointer">
            Demo
          </h3>
        </div>
      </motion.div>
    </div>
  );
}
