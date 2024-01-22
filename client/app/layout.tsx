import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          cal.variable,
          inter.variable,
        )}
      >
        <Providers>
          {children}
          {/* <Analytics /> */}
        </Providers>
      </body>
    </html>
  );
}
