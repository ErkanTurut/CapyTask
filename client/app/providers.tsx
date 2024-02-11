"use client";

import { ModalProvider } from "@/components/modal/provider";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import useWindowSize from "@/lib/hooks/use-window-size";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const { isMobile } = useWindowSize();
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ModalProvider>
        <TailwindIndicator />
        {children}
        <Toaster
          closeButton
          position={isMobile ? "top-center" : "bottom-right"}
        />
      </ModalProvider>
    </NextThemesProvider>
  );
}
