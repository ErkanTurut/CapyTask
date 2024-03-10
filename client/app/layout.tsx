import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

const title = "Gembuddy - Prevent maintenance issues before they happen";
const description = " Prevent maintenance issues before they happen";

const image = "https://vercel.pub/thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [image],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("===W", headers());
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <Providers headers={headers()}>{children}</Providers>
      </body>
    </html>
  );
}
