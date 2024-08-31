import React, { useState, useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface PopoverComboboxProps {
  triggerText: string;
  placeholder?: string;
  emptyText?: string;
  options: Option[];
  onSearch: (search: string) => void;
  onSelect: (option: Option) => void;
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
}

export function PopoverCombobox({
  triggerText,
  placeholder = "Search...",
  emptyText = "No results found.",
  options,
  onSearch,
  onSelect,
  className,
  isLoading = false,
  error = null,
}: PopoverComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {search
            ? options.find((option) => option.value === search)?.label
            : triggerText}
          <Icons.chevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            onValueChange={handleSearch}
          />
          <CommandEmpty>
            {isLoading
              ? "Loading..."
              : error
              ? "Error loading options"
              : emptyText}
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  onSelect(option);
                  setSearch(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    search === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
