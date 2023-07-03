import { FC } from "react";
import { SignUp } from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="h-full max-w-4xl mx-auto flex flex-row items-center justify-center gap-20">
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "ghost" }), "self-start")}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        Home
      </Link>
      <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: buttonVariants(),
              formFieldInput:
                "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              socialButtonsIconButton: buttonVariants({
                variant: "ghost",
              }),
              card: "rounded-xl border bg-card text-card-foreground shadow",
              header: "flex flex-col space-y-1.5",
              headerTitle: "font-semibold leading-none tracking-tight",
              headerSubtitle: "text-sm text-muted-foreground",
              footer: "flex items-center ",
              formFieldLabel:
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            },
          }}
        />
      </div>
    </div>
  );
};

export default page;
