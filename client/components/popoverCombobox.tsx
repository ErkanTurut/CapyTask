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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export function ComboBox<T extends string>({
  options,
  onSelect,
  children,
  placeholder = "Type to search...",
  className,
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
                    onSelect(status);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {status.icon && (
                      <>
                        {(() => {
                          const Icon = Icons[status.icon];
                          return <Icon className="size-4" />;
                        })()}
                      </>
                    )}
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
