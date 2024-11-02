"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/Hooks/use-outside-click";
import { expenseField } from "@/assets/commanInterface/ComonInterface";
import ExpensesTable from "../ExpensesTable";
export function ExpandableCardDemo({
  field,
  handleDeleteField,
}: {
  field: expenseField[];
  handleDeleteField: (id: string) => Promise<void>;
}) {
  const [active, setActive] = useState<expenseField | number | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

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

  //   TODO update balance in field section one it updated in expenses section
  //  TODO Make table responsive
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
                  <motion.button
                    layoutId={`button-${active._id}-${active._id}`}
                    className="rounded-full h-6 w-6 text-sm flex items-center justify-center font-bold bg-white text-black"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </motion.button>
                </div>

                <div className="pt-4 relative px-4">
                  <ExpensesTable
                    field={active}
                    key={active._id}
                    handleDeleteField={handleDeleteField}
                    setActive={setActive}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className=" dark max-w-3xl mx-auto w-full gap-4">
        {field?.map((card) => (
          <>
            <motion.div
              layoutId={`card-${card._id}-${card._id}`}
              key={`card-${card._id}-${card._id}`}
              onClick={() => setActive(card)}
              className="dark p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col md:flex-row ">
                <div className="">
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
                  {card?.balance && (
                    <motion.p
                      layoutId={`description-${card.balance}-${card._id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                    >
                      balance : {card.balance}
                    </motion.p>
                  )}
                </div>
              </div>
              <motion.button
                layoutId={`button-${card._id}-${card._id}`}
                className="dark px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
              >
                Edit
              </motion.button>
            </motion.div>
            <div className="dark bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
          </>
        ))}
      </ul>
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
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
