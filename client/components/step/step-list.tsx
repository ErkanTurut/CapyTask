import { Database } from "@/types/supabase.types";
import { FC } from "react";

import { Icons } from "../icons";
import Link from "next/link";

interface stepListProps {
  steps: Database["public"]["Tables"]["step"]["Row"][] | null;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const StepList: FC<stepListProps> = ({ steps, searchParams }) => {
  // steps can have an order value, and if so we want to sort the steps by that order
  const sortedSteps = steps?.sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    <ul className="grid gap-1">
      {sortedSteps?.map((step) => (
        <li
          key={step.id}
          autoFocus={searchParams?.step_id === step.id}
          className="flex flex-row items-center  justify-between rounded-md border border-border  p-2"
        >
          <span className="grid gap-1">
            <h3>{step.name}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </span>
          <Link
            scroll={false}
            href={{
              pathname: "",
              query: { step_id: step.id },
            }}
          >
            <Icons.chevronRight className="h-6 w-6" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StepList;
