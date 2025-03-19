"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(createTheme(getDesignTokens("light")));

  useEffect(() => {
    setTheme(createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light")));
  }, [prefersDarkMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#1976d2",
            light: "#42a5f5",
            dark: "#1565c0",
          },
          secondary: {
            main: "#9c27b0",
            light: "#ba68c8",
            dark: "#7b1fa2",
          },
          background: {
            default: "#ffffff",
            paper: "#f5f5f5",
          },
        }
      : {
          primary: {
            main: "#90caf9",
            light: "#e3f2fd",
            dark: "#42a5f5",
          },
          secondary: {
            main: "#ce93d8",
            light: "#f3e5f5",
            dark: "#ab47bc",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
        }),
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === "light" ? "#ffffff" : "#121212",
          color: mode === "light" ? "#171717" : "#ededed",
        },
      },
    },
  },
}); 