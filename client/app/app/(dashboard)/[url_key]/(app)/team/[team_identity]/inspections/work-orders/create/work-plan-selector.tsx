"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  useCommandState,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Database } from "@/types/supabase.types";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface WorkPlanSelectorProps {
  data: Database["public"]["Tables"]["plan"]["Row"][] | null;
  searchParams: {
    q: string;
  } | null;
}

export function WorkPlanSelector({
  data,
  searchParams,
}: WorkPlanSelectorProps) {
  if (!data) {
    return (
      <Link
        href="/app/teams/create"
        className={buttonVariants({ variant: "outline" })}
      >
        Create a plan
      </Link>
    );
  }

  const router = useRouter();
  const supabase = createClient();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchPlans, setSearchPlans] = React.useState<
    Database["public"]["Tables"]["plan"]["Row"][]
  >([]);

  const debouncedValue = useDebouncedCallback(async (value: string) => {
    const { data } = await supabase
      .from("plan")
      .select("*")
      .textSearch("name", value, { type: "websearch" });
    setSearchPlans(data || []);
  }, 1000);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? data.find((plan) => plan.name === value)?.name
            : "Select work plan template..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search work plan template..."
            className="h-9"
            onValueChange={(e) => debouncedValue(e)}
          />
          {/* {loading && <CommandLoading>Loading...</CommandLoading>} */}
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading="Create a new plan">
              <CommandItem>
                <Link href="/app/teams/create">Create a new plan</Link>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="recherche">
              {searchPlans.map((plan) => (
                <CommandItem
                  key={plan.id}
                  value={plan.name}
                  onSelect={() => {
                    setValue(plan.name === value ? "" : plan.name);
                    setOpen(false);
                  }}
                >
                  {plan.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === plan.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup key={1} heading="Recent">
              {data.map((plan) => (
                <CommandItem
                  key={plan.id}
                  value={plan.name}
                  onSelect={() => {
                    setValue(plan.name === value ? "" : plan.name);
                    setOpen(false);
                  }}
                >
                  {plan.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === plan.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
