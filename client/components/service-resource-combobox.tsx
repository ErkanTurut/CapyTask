"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { RouterOutput } from "@/trpc/client";
import { useRef, useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import * as React from "react";

import { Icons } from "@/components/icons";

interface ServiceResourceComboBoxProps<T> {
  placeholder?: string;
  className?: string;
  selectedValues: string[];
  onSelect: (value: string) => void;
  value: string;
  setValue: (value: string) => void;
  isLoading: boolean;
  service_resource: RouterOutput["db"]["service_resource"]["get"]["textSearch"];
}

export function ServiceResourceComboBox<T extends string>({
  placeholder = "Type to search...",
  className,
  selectedValues,
  onSelect,
  setValue,
  isLoading,
  service_resource,
}: ServiceResourceComboBoxProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = React.useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleOnSearchChange = useDebouncedCallback(async (e: string) => {
    setIsTyping(false);
    if (e === "") {
      return;
    }
    setValue(e);
  }, 400);

  const handleTyping = async (e: string) => {
    setIsTyping(true);
    handleOnSearchChange(e);
  };

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          isLoading={isLoading}
          className="w-80 font-normal"
          variant={"outline"}
        >
          <Icons.search className="mr-2 h-4 w-4" />
          <span>Select Employee</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-80 rounded-sm p-0", className)}
        align="center"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
      >
        <Command shouldFilter={false} className="rounded-sm">
          <CommandInput
            onValueChange={isLoading ? undefined : handleTyping}
            className="text-xs leading-normal"
            placeholder={placeholder}
            ref={inputRef}
          />
          <CommandList>
            <CommandGroup>
              {service_resource?.map((service_resource, index) => (
                <CommandItem
                  key={service_resource.id}
                  value={service_resource.id}
                  onSelect={async (value) => {
                    onSelect(value);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icons.checkCircled
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(service_resource.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    <span>
                      {service_resource.user?.first_name}{" "}
                      {service_resource.user?.last_name}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {!isLoading && isTyping && (
              <CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                Listening...
              </CommandEmpty>
            )}

            {!isLoading && !isTyping && (
              <CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                No results found
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
