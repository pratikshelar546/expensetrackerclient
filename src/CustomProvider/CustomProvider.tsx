"use client";
import store from "@/Redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface customProviderChildern {
  children: ReactNode;
}
const CustomProvider: React.FC<customProviderChildern> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CustomProvider;
