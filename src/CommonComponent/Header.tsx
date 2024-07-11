"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

const components: { title: String; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Header() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center top-0  fixed w-full">
      <div className="flex w-full text-white justify-between gap-6 items-center py-4 px-8 rounded-xl">
        <div>
          <h3 onClick={() => router.push("/")} className=" cursor-pointer">ExpenseWise</h3>
        </div>
        <div className="flex gap-5">
          <h3>Documentation</h3>
          <h3 onClick={() => router.push("/demo")} className=" cursor-pointer">
            Demo
          </h3>
        </div>
      </div>
    </div>
  );
}
