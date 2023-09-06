import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { TailwindIndicator } from "@/components/tailwindIndicator";

const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/themeProvider";
export default function RootLayout({
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
    </html>
  );
}
