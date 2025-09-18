"use client";

import { ThemeProvider } from "next-themes";
import TimeTheme from "./time-theme";
import React from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      themes={["light", "dark"]}
      disableTransitionOnChange
    >
      {/* Automatically switch by local time: 08:00–18:00 light, else dark */}
      <TimeTheme />
      {children}
    </ThemeProvider>
  );
}


