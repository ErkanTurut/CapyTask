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
  CommandSeparator,
} from "@/components/ui/command";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Database } from "@/types/supabase.types";
import { Icons } from "@/components/icons";
import { useDebouncedCallback } from "use-debounce";
type Status = {
  value: string;
  label: string;
};

interface SearchStepProps {
  searchParams: {
    q: string;
  };
  steps: Database["public"]["Tables"]["step"]["Row"][];
}

export function SearchStep({ searchParams, steps }: SearchStepProps) {
  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <CommandDialog open={true} onOpenChange={() => router.back()}>
        <StatusList steps={steps} />
      </CommandDialog>
    );
  }

  return (
    <Drawer open={true} onClose={() => router.back()}>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList steps={steps} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function StatusList({
  steps,
}: {
  steps: Database["public"]["Tables"]["step"]["Row"][];
}) {
  const router = useRouter();

  const debouncedValue = useDebouncedCallback((value: string) => {
    router.push(`?q=${encodeURIComponent(value)}`);
  }, 2000);
  return (
    <Command shouldFilter={false}>
      <CommandInput
        onValueChange={(e) => {
          debouncedValue(e);
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
                console.log("clicked", step.id);
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
