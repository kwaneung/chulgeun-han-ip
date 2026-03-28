"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { SystemThemeLock } from "@/components/SystemThemeLock";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="chulgeun-han-ip-theme"
      disableTransitionOnChange
    >
      <SystemThemeLock />
      {children}
    </ThemeProvider>
  );
}
