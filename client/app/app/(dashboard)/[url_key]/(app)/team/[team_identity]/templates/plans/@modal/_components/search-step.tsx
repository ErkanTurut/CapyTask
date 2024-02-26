"use client";

import { useRef, useEffect, useState, FormEvent } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Database } from "@/types/supabase.types";
type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

interface SearchStepProps {
  searchParams: {
    q: string;
  };
  steps: Database["public"]["Tables"]["step"]["Row"][];
}

export function SearchStep({ searchParams, steps }: SearchStepProps) {
  const router = useRouter();
  console.log(steps);

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(searchParams.q ?? "");
  const [filteredSteps, setFilteredSteps] = useState<
    Database["public"]["Tables"]["step"]["Row"][]
  >([]);

  useEffect(() => {
    setFilteredSteps(steps);
  }, [steps]);

  useEffect(() => {
    router.push(`?q=${encodeURIComponent(value)}`);
  }, [value]);

  useEffect(() => {
    // check for focus and if not, focus
    if (inputRef.current && document.activeElement !== inputRef.current) {
      // focus at the end of the text
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length,
      );
    }
  }, []);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <CommandDialog open={true} onOpenChange={() => router.back()}>
        <StatusList steps={filteredSteps} setValue={setValue} />
      </CommandDialog>
    );
  }

  return (
    <Drawer open={true} onClose={() => router.back()}>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList steps={filteredSteps} setValue={setValue} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function StatusList({
  setValue,
  steps,
}: {
  setValue: (e: string) => void;
  steps: Database["public"]["Tables"]["step"]["Row"][];
}) {
  const router = useRouter();
  console.log(steps);

  return (
    <Command shouldFilter={false}>
      <CommandInput
        onValueChange={(e) => setValue(e)}
        placeholder="Filter status..."
      />
      <CommandList className="w-full">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {steps.map((step) => (
            <Link href={`/`}>
              <CommandItem
                className="cursor-pointer"
                key={step.id}
                value={step.id}
                onClick={() => {
                  router.back();
                }}
              >
                {step.name}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
