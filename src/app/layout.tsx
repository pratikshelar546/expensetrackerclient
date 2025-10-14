import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/CommonComponent/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextAuthProvider } from "../CustomProvider/Provider";
import DynamicThemeProvider from "@/themeprovider/DynamicThemeProvider";
import Footer from "@/CommonComponent/Footer";
import { useEffect } from "react";
import Head from "next/head";
import SWRegister from "./SWRegister";
// import "../../public/manifest.json"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ExpenseWise",
  description:
    "Track all expenses with expensewise. expensewise is expensetracking website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0a74da" />
</head>
      <body className={`${inter.variable} font-mono bg-black min-h-screen flex flex-col`}>
        <SWRegister/>
        <DynamicThemeProvider>

          <NextAuthProvider>
            <Header />
            {children}
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </NextAuthProvider>
        </DynamicThemeProvider>
      </body>
    </html>
  );
}
