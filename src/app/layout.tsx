import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/CommonComponent/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextAuthProvider } from "../CustomProvider/Provider";
import DynamicThemeProvider from "@/themeprovider/DynamicThemeProvider";

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
      <body className={`${inter.variable} font-mono bg-black`}>
        <DynamicThemeProvider>

          <NextAuthProvider>
            <Header />
            {children}
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
