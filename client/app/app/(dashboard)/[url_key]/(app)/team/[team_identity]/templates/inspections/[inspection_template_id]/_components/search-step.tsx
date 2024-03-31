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
import { trpc } from "@/trpc/server";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchStepProps {
  searchParams: {
    q: string;
  };
  inspection_template_id: string;
  initialData: NonNullable<
    Awaited<
      ReturnType<
        (typeof trpc)["db"]["template"]["step"]["getStepsByInspection"]["query"]
      >
    >
  >;
}

export function SearchStep({
  searchParams,
  inspection_template_id,
  initialData,
}: SearchStepProps) {
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
          initialData={initialData}
          inspection_template_id={inspection_template_id}
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
            initialData={initialData}
            inspection_template_id={inspection_template_id}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function StepCommand({
  query,
  onSearch,
  initialData,
  inspection_template_id,
}: {
  query?: string;
  onSearch: (value: string) => void;
  inspection_template_id: string;
  initialData: NonNullable<
    Awaited<
      ReturnType<
        (typeof trpc)["db"]["template"]["step"]["getStepsByInspection"]["query"]
      >
    >
  >;
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
          <Link href={"./create"}>
            <CommandItem className="cursor-pointer">
              <Icons.plusCircled className="mr-2 h-4 w-4" />
              <span>Create a new step</span>
            </CommandItem>
          </Link>
        </CommandGroup>
        <CommandSeparator alwaysRender className="mb-1" />
        <CommandEmpty>no found</CommandEmpty>
        <CommandGroup>
          {initialData.map((step) => (
            <CommandItem
              className="cursor-pointer"
              key={step.id}
              value={step.id}
              onSelect={(e) => {
                console.log(e);
              }}
            >
              {step.inspection_template_id === inspection_template_id && (
                <Icons.checkCircled className="mr-2 h-4 w-4" />
              )}
              <span>{step.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
