"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/Hooks/use-outside-click";
import { expenseField } from "@/assets/commanInterface/ComonInterface";
import ExpensesTable from "../ExpensesTable";
import { useRouter } from "next/navigation";
import EmptyState from "@/CommonComponent/UI/EmptyState";

export function ExpandableCardDemo({
  field,
  // handleDeleteField,
}: {
  field: expenseField[];
  // handleDeleteField: (id: string) => Promise<void>;
}) {
  const [active, setActive] = useState<expenseField | number | boolean | null>(
    null
  );
  const [hoveredIndex, setHoverIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const addNewMember = (id: string) => {
    console.log(id);
  };
  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dark fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="dark fixed inset-0  grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active._id}-${active._id}`}
              ref={ref}
              className="dark w-full max-w-2xl  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div>
                <div className="dark flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.fieldName}-${active._id}`}
                      className="dark font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.fieldName}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.RecivedAmount}-${active._id}`}
                      className="dark text-neutral-600 dark:text-neutral-400"
                    >
                      Recived Amount : {active.RecivedAmount}
                    </motion.p>
                  </div>
                  <motion.div
                    className="flex gap-2"
                    layoutId={`button-${active._id}-${active._id}`}
                  >
                    <motion.button
                      className="rounded-full h-7 w-7 text-sm flex items-center justify-center font-bold hover:bg-white text-black"
                      onClick={() => addNewMember(active._id)}
                    >
                      <AddUser />
                    </motion.button>
                    <motion.button
                      className="rounded-full h-7 w-7 text-sm flex items-center justify-center font-bold bg-white text-black"
                      onClick={() => setActive(null)}
                    >
                      <CloseIcon />
                    </motion.button>
                  </motion.div>
                </div>
                <div className="pt-4 relative px-4">
                  {/* <ExpensesTable
                    field={active}
                    key={active._id}
                    handleDeleteField={handleDeleteField}
                    setActive={setActive}
                  /> */}
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {field.length > 0 ? <ul className={`dark max-w-3xl mx-auto w-full gap-4 grid grid-cols-1   py-10 ${field.length > 1 && 'md:grid-cols-2 lg:grid-cols-2'}`}>
        {field?.map((card, idx) => (
          <div key={idx}>
            <motion.div
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              layoutId={`card-${card._id}-${card._id}`}
              key={`card-${card._id}-${card._id}`}
              onClick={() => router.push(`/expofield/${card._id}`)}
              className=" relative group  block p-2 h-full w-full "
            >
              <div className="dark p-4 flex flex-col md:flex-row justify-between items-center rounded-xl cursor-pointer relative bg-slate-950 z-20 border dark:border-white/[0.2] hover:border-slate-800 h-full">
                <div className="flex gap-4 flex-col md:flex-row">
                  <div>
                    <motion.h3
                      layoutId={`title-${card.fieldName}-${card._id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                    >
                      Field Name: {card.fieldName}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.RecivedAmount}-${card._id}`}
                      className="dark text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                    >
                      Recived Amount: {card?.RecivedAmount}
                    </motion.p>
                    <motion.p
                      layoutId={`description-${card.balance}-${card._id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                    >
                      balance :{" "}
                      {card?.balance === 0 ? card.RecivedAmount : card.balance}
                    </motion.p>
                    <motion.p
                      layoutId={`description-${card.balance}-${card._id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                    >
                      Expiry Date :
                      {card?.expiry}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${card._id}-${card._id}`}
                  className="dark px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-slate-900 hover:border hover:border-slate-700 hover:text-white text-black mt-4 md:mt-0 z-10"
                >
                  Edit
                </motion.button>
              </div>

              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-2xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <div className="dark bg-gradient-to-r from-transparent block sm:hidden via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
          </div>
        ))}
      </ul>
        :
        <>
          <EmptyState />
        </>}
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export const AddUser = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={hovered ? "black" : "white"}
      className="size-7  p-1 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
      />
    </svg>
  );
};
