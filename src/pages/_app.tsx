import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, FormControlLabel, Switch, ThemeProvider, styled } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { darkTheme, lightTheme } from "@/theme";
import { AuthProvider } from "@/context/authContext";
import DashboardLayout from "@/components/layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Recuperar a preferência do tema do local storage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(savedTheme === 'true');
    }
  }, []);
 
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
    localStorage.setItem('darkMode', event.target.checked.toString());
  };



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <DashboardLayout darkMode={darkMode} handleThemeChange={handleThemeChange}>
          <Component {...pageProps} />
        </DashboardLayout>
      </AuthProvider>
    </ThemeProvider>)
}
