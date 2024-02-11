"use client";
import { Database } from "@/types/supabase.types";
import { buttonVariants } from "@/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Icons } from "../icons";

import { cn } from "@/lib/utils";

interface stepListProps {
  steps: Database["public"]["Tables"]["step"]["Row"][] | null;
  searchParams?: { [key: string]: string | string[] | undefined };
  children?: React.ReactNode;
}

const StepList: FC<stepListProps> = ({ steps, searchParams, children }) => {
  const sortedSteps = steps?.sort((a, b) => (a.order || 0) - (b.order || 0));
  const pathname = usePathname().replace("/create", "");

  return (
    <ul className="grid w-full gap-1">
      {sortedSteps?.map((step) => (
        <li
          key={step.id}
          className={cn(
            buttonVariants({ variant: "secondary", size: "default" }),
            "group w-full grow justify-between overflow-hidden  px-2",
          )}
          draggable
        >
          <Link
            className="flex w-full items-center justify-between px-2"
            href={{
              href: pathname,
              query: {
                ...searchParams,
                step_id: step.id,
              },
            }}
          >
            {step.name}

            <span className="sr-only">Get Started</span>
            <div className="ml-1 transition group-hover:translate-x-1">
              <Icons.arrowRight className=" h-4 w-4" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StepList;
