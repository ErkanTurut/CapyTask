"use client";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  onSelect: ({
    prevValue,
    value,
  }: {
    prevValue: Option<T> | undefined;
    value: Option<T>;
  }) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
  selectedValue?: T;
}

export function PopoverComboBox<T extends string>({
  options,
  onSelect,
  children,
  placeholder = "Type to search...",
  className,
  selectedValue,
}: ComboBoxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState<Option<T> | undefined>(
    options.find((option) => option.value === selectedValue),
  );

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
                    const prevValue = currentValue;
                    setCurrentValue(status);
                    onSelect({ prevValue, value: status });
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>{status.label}</span>
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
