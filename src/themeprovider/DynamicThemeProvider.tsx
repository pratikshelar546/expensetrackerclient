import React from "react";
import { createTheme, Theme as MuiTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

type Children = {
  children: React.ReactNode;
};

// Extend the MUI Theme interface
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

// Define your custom theme
const theme: MuiTheme = createTheme({
    palette: {
        mode: 'dark',
      },
});

const DynamicThemeProvider = ({ children }: Children) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default DynamicThemeProvider;
