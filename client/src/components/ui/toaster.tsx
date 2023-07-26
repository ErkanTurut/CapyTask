"use client";

import { Toaster as RadToaster } from "sonner";

export function Toaster() {
  return (
    <RadToaster
      position="bottom-right"
      closeButton
      richColors
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  );
}
