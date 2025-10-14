// SWRegister.tsx (client component)
'use client';
import InstallButton from "@/CommonComponent/InstallButton";
import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("SW registered:", reg);
          return reg;
        })
        .catch((err) => {
          console.log("SW registration failed:", err);
          return err;
        });
    }
  }, []);

  return <InstallButton/>; // This component just runs the effect
}
