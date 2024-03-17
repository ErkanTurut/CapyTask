"use client";

import { useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase.types";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchStepProps {
  searchParams: {
    q: string;
  };
  plan_id: string;
  steps: Database["public"]["Tables"]["step"]["Row"][];
}

export function SearchStep({ searchParams, steps, plan_id }: SearchStepProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const debouncedValue = useDebouncedCallback((value: string) => {
    router.replace(`?q=${encodeURIComponent(value)}`);
  }, 1000);

  if (isDesktop) {
    return (
      <CommandDialog open={true} onOpenChange={() => router.back()}>
        <StepCommand
          onSearch={debouncedValue}
          query={searchParams.q}
          steps={steps}
          plan_id={plan_id}
        />
      </CommandDialog>
    );
  }

  return (
    <Drawer open={true} onClose={() => router.back()}>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StepCommand
            onSearch={debouncedValue}
            query={searchParams.q}
            steps={steps}
            plan_id={plan_id}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function StepCommand({
  steps,
  query,
  onSearch,
  plan_id,
}: {
  steps: Database["public"]["Tables"]["step"]["Row"][];
  query?: string;
  onSearch: (value: string) => void;
  plan_id: string;
}) {
  const [searchValue, setSearchValue] = useState(query || "");

  return (
    <Command shouldFilter={false}>
      <CommandInput
        value={searchValue}
        onValueChange={(e) => {
          setSearchValue(e);
          onSearch(e);
        }}
        placeholder="Search for a step..."
      />
      <CommandList>
        <CommandGroup>
          <CommandItem>
            <Icons.plusCircled className="mr-2 h-4 w-4" />
            <Link href={`./create`}>Create a new step</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator alwaysRender />
        <CommandEmpty>no found</CommandEmpty>
        <CommandGroup heading="Or use an existing one">
          {steps.map((step) => (
            <CommandItem
              className="cursor-pointer"
              key={step.id}
              value={step.id}
              onSelect={() => {
                // run({
                //   step_id: step.id,
                //   plan_id: plan_id,
                //   order: null,
                // });
              }}
            >
              <Icons.user className="mr-2 h-4 w-4" />
              <span>{step.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
