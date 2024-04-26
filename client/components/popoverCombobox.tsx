"use client";
import { Button } from "@/components/ui/button";
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

interface Option<T> {
  value: T;
  label: string;
  icon: keyof typeof Icons;
}

interface ComboBoxProps<T> {
  options: Option<T>[];
  initialValue: string;
  onSelect?: (value: Option<T>["value"]) => void;
  disabled?: boolean;
}

export function ComboBox<T extends string>({
  options,
  initialValue,
  onSelect,
  disabled,
}: ComboBoxProps<T>) {
  const [openPopover, setOpenPopover] = React.useState(false);
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState<Option<T>>(
    options.find((option) => option.value === initialValue) || options[0],
  );
  const [searchValue, setSearchValue] = React.useState("");

  const isSearching = searchValue.length > 0;

  const handleSelectOption = (option: Option<T>) => {
    onSelect?.(option.value);
    setSelectedOption(option);
    setOpenPopover(false);
    setOpenTooltip(false);
    setSearchValue("");
  };

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <Tooltip
        delayDuration={500}
        open={openTooltip}
        onOpenChange={setOpenTooltip}
      >
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              aria-label="Set priority"
              variant="ghost"
              size="sm"
            >
              {selectedOption.icon && (
                <>
                  {(() => {
                    const Icon = Icons[selectedOption.icon];
                    return (
                      <Icon className="mr-2 size-4 fill-muted-foreground group-hover:fill-primary" />
                    );
                  })()}
                </>
              )}
              {selectedOption.label}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent
          hideWhenDetached
          side="bottom"
          align="start"
          sideOffset={6}
          className="flex h-8 items-center gap-2 border bg-background px-2 text-xs"
        >
          <span className="text-primary">Change priority</span>
          <span className="flex size-[18px] items-center justify-center rounded-sm border text-xs text-primary">
            <kbd>P</kbd>
          </span>
        </TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-[206px] rounded-lg p-0"
        align="start"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
      >
        <Command className="rounded-lg">
          <CommandInput
            value={searchValue}
            onValueChange={(searchValue) => {
              if ([0, 1, 2, 3, 4].includes(Number.parseInt(searchValue))) {
                handleSelectOption(options[Number.parseInt(searchValue)]);
              }
              setSearchValue(searchValue);
            }}
            className="text-[0.8125rem] leading-normal"
            placeholder="Set priority..."
          >
            {!isSearching && (
              <span className="flex size-[18px] items-center justify-center rounded-sm border text-xs text-primary">
                <kbd>P</kbd>
              </span>
            )}
          </CommandInput>
          <CommandList>
            <CommandGroup>
              {options.map((status, index) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={(value) => {
                    handleSelectOption(
                      options.find((status) => status.value === value)!,
                    );
                  }}
                  className="group flex w-full items-center justify-between rounded-md text-[0.8125rem] leading-normal text-primary"
                >
                  <div className="flex items-center">
                    {status.icon && (
                      <>
                        {(() => {
                          const Icon = Icons[status.icon];
                          return (
                            <Icon className="mr-2 size-4 fill-muted-foreground group-hover:fill-primary" />
                          );
                        })()}
                      </>
                    )}
                    <span>{status.label}</span>
                  </div>
                  <div className="flex items-center">
                    {!isSearching && <span className="text-xs">{index}</span>}
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
