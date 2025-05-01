"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import * as motion from "framer-motion/client";
import SignInBtn from "./SignInBtn";
import { SessionProvider, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { session } from "@/app/api/auth/[...nextauth]/route";

export function Header() {
  const router = useRouter();
  const session = useSession();


  return (
    <SessionProvider>

      <AnimatePresence mode={'wait'}>
        <motion.div
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 30,
            delay: 0.7
          }}
          className="fixed top-0 z-[999] w-full text-white text-lg flex border-b py-2 border-blue-950 border-opacity-70 bg-black"
        >
          <div className="wrapper flex w-full items-center justify-between p-3 flex-row gap-5">

            <div>
              <h3 onClick={() => router.push("/")} className=" cursor-pointer">
                ExpenseWise
              </h3>
            </div>
            <div className="flex md:gap-10 gap-5">
              {/* <h3 onClick={() => router.push("/profile")}>Profile</h3> */}
              <h3 onClick={() => router.push("/expensepool")} className=" cursor-pointer">
                Expense Pool
              </h3>
              <button className="outline-none border-none" onClick={() => router.push("/login")}>Login</button>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
    </SessionProvider>

  );
}
