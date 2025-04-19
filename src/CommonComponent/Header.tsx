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

        <header className="flex justify-center items-center top-0 z-[1] sticky w-full bg-black">
          <motion.div
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 1, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.7, delay: 1.4 }}
            className="flex w-full max-w-6xl text-white justify-between md:gap-5 gap-2 items-center py-4 px-8 md:flex-row flex-col text-lg"
          >
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
              <SignInBtn />
            </div>
          </motion.div>
        </header>
      </AnimatePresence>
    </SessionProvider>

  );
}
