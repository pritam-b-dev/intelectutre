"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      {/* Toast Notification Config */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b", // zinc-900
            color: "#fafafa", // zinc-50
            border: "1px solid #27272a", // zinc-800
          },
        }}
      />
    </NextThemesProvider>
  );
}
