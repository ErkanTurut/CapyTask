import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import { TailwindIndicator } from "@/components/tailwindIndicator";

import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <Providers>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
