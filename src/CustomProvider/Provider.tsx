"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface children {
  children: ReactNode;
}

export const NextAuthProvider: React.FC<children> = ({ children }) => {
  return <SessionProvider> {children} </SessionProvider>;
};

