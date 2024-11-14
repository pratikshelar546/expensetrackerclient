"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface DropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string }>;
  setField: React.Dispatch<React.SetStateAction<{}>>;
}

const Dropdown = React.forwardRef<HTMLInputElement, DropdownProps>(
  ({ className, options, setField, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const handleSelect = (value: string) => {
      setField((prev) => ({ ...prev, fieldType: value }));
      setSelected(value);
      setIsOpen(false);
    };
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        {/* <select
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400
           `,
            className
          )}
        > */}
          <motion.div
            className={cn(
              "relative w-full border bg-gray-50 dark:bg-zinc-800 text-black dark:text-white rounded-md cursor-pointer",
              className
            )}
            ref={dropdownRef}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={cn(
                "flex justify-between items-center p-3 h-10",
                "dark:placeholder-neutral-600 placeholder-neutral-400",
                "focus:outline-none"
              )}
            >
              <span>
                {selected
                  ? options.find((opt) => opt.value === selected)?.value
                  : "Personal"}
              </span>
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-200 transform"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 15z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {options.map((option) => (
                  <li
                    key={option.value}
                    className="px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.value}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        {/* </select> */}
        {/* <input
          type={type}
          
          ref={ref}
          {...props}
        /> */}
      </motion.div>
    );
  }
);
Dropdown.displayName = "Input";

export { Dropdown };
