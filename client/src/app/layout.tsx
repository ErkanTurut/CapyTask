import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          "bg-white text-slate-900 antialiased light",
          inter.className
        )}
      >
        <body className={"min-h-screen pt-12 bg-slate-50 antialiased"}>
          <NavBar />
          <div className="container max-w7xl mx-auto h-full pt-12">
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
