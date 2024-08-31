"use client";
import {
  Command,
  CommandEmpty,
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
import { useDebouncedCallback } from "use-debounce";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api, RouterOutput } from "@/trpc/client";
import { useRef, useState } from "react";

interface ComboBoxProps<T> {
  placeholder?: string;
  className?: string;
}

export function PopoverComboBox<T extends string>({
  placeholder = "Type to search...",
  className,
}: ComboBoxProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const { data: service_resource, isFetching } =
    api.db.service_resource.get.textSearch.useQuery({
      search: value,
    });
  const handleOnSearchChange = useDebouncedCallback(async (e: string) => {
    setIsTyping(false);
    if (e === "") {
      return;
    }
    await setValue(e);
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
          isLoading={isFetching}
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
            onValueChange={isFetching ? undefined : handleTyping}
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
                  onSelect={async () => {
                    // setSelectedValues([...selectedValues, service_resource]);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {service_resource.user?.first_name}{" "}
                      {service_resource.user?.last_name}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {!isFetching && isTyping && (
              <CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                Listening...
              </CommandEmpty>
            )}

            {!isFetching && !isTyping && (
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
