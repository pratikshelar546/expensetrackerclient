"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../../../CommonComponent/UI/animated-modal";
import { AddFieldForm } from "./AddFieldForm";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import * as motion from "framer-motion/client";
export function AddFieldModal({
  fetchFieldData,
}: {
  fetchFieldData: () => Promise<void>;
}) {
  const { data: session } = useSession();
  return (
    <motion.div className="dark flex items-center justify-between mt-5"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 18,
        delay: 0.5
      }}
    >
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Expense Pools</h2>
        <p className="text-gray-400 etxt-xl">Manage and organize your expense categories</p>
      </div>
      <Modal>
        <ModalTrigger className="dark bg-black justify-center group/modal-btn inline-flex h-12 animate-shimmer items-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,rgba(2,6,23,var(--tw-bg-opacity)),45%,#1e2631,55%,rgba(2,6,23,var(--tw-bg-opacity)))] bg-[length:200%_100%] bg-opacity-100 px-6 font-medium text-white transition-colors focus:outline-none mb-5">
          <span className="group-hover/modal-btn:translate-y-44 text-center transition duration-500">
            Add Expense Pool
          </span>
          <div className="-translate-y-10 group-hover/modal-btn:translate-y-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            🚀
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            {session ? <div className="py-3 flex flex-col gap-x-4 gap-y-2 items-start justify-start max-w-lg mx-auto">
              <AddFieldForm fetchFieldData={fetchFieldData} />
            </div> : <div className="w-full h-full items-center justify-center flex flex-col">
              <h4 className=" font-text-neutral-400 mt-4 text-base font-normal text-center mb-4">You're not logged in yet. Please sign in to continue.</h4>
              <button
                onClick={() => signIn("google")}
                className="bg-white text-black py-3 px-4 rounded-md w-[60%] font-semibold flex gap-2 items-center justify-between"
              >
                <FcGoogle size={"1.5em"} /> Sign in with Google
              </button>

            </div>
            }
          </ModalContent>
        </ModalBody>
      </Modal>
    </motion.div>
  );
}
