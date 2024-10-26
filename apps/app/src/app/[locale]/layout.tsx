import "@gembuddy/ui/globals.css";
import { cn } from "@gembuddy/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Gembuddy",
  description: "You Lead. Buddy’s Got Your Back.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased   font-sans        min-h-screen bg-background",
        )}
      >
        <Providers headers={await headers()}>{children}</Providers>
      </body>
    </html>
  );
}
