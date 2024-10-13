"use client";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@gembuddy/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@gembuddy/ui/popover";

import * as React from "react";

import { Icons } from "./icons";
import { cn } from "@/lib/utils";

interface Option<T> {
  value: T;
  label: string;
  icon?: keyof typeof Icons;
}

interface ComboBoxProps<T> {
  options: Option<T>[];
  onSelect: (value: Option<T>) => void;
  selected?: Option<T>;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export function PopoverComboBox<T extends string>({
  options,
  onSelect,
  children,
  placeholder = "Type to search...",
  className,
  selected,
}: ComboBoxProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className={cn("w-[206px] rounded-sm p-0", className)}
        align="center"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
      >
        <Command className="rounded-sm">
          <CommandInput
            className="text-xs leading-normal"
            placeholder={placeholder}
          />
          <CommandList>
            <CommandGroup>
              {options.map((status, index) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={async () => {
                    console.log(status);
                    onSelect(status);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={selected === status ? "underline" : undefined}
                    >
                      {status.label}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
