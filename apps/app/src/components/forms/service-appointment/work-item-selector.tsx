"use client";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import { api, RouterOutput } from "@gembuddy/trpc/client";
import { Button } from "@gembuddy/ui/button";
import { ScrollArea } from "@gembuddy/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@gembuddy/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@gembuddy/ui/command";
import { Icons } from "@/components/icons";

interface WorkItemSelectorProps {
  onSelect: (
    location: NonNullable<
      RouterOutput["db"]["work_order_item"]["get"]["byWorkOrder"]["data"]
    >[number]
  ) => void;
  selectedValue?: NonNullable<
    RouterOutput["db"]["work_order_item"]["get"]["byWorkOrder"]["data"]
  >[number];
  workOrderItems: RouterOutput["db"]["work_order_item"]["get"]["byWorkOrder"]["data"];
}

function WorkItemSelector({
  onSelect,
  selectedValue,
  workOrderItems,
}: WorkItemSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          className="w-72 justify-start font-normal sm:w-60 md:w-80"
          variant={"outline"}
          type="button"
        >
          <Icons.gear className="mr-2 h-4 w-4" />
          <span>
            {selectedValue
              ? `${selectedValue?.asset?.name} ${selectedValue?.location?.name}`
              : "Select a work item"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-72 p-0 sm:w-60 md:w-80")}
        align="center"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
        side="top"
      >
        <Command className="rounded-sm">
          <CommandInput
            // onValueChange={handleTyping}
            className="text-xs leading-normal"
            placeholder="Type to search..."
          />
          <ScrollArea className="h-60">
            <CommandList className="max-h-full">
              <CommandGroup>
                {workOrderItems?.map((workOrderItem) => (
                  <CommandItem
                    key={workOrderItem.id}
                    value={`${JSON.stringify(
                      workOrderItem.asset
                    )} ${JSON.stringify(workOrderItem.location)}`}
                    onSelect={async () => {
                      onSelect?.(workOrderItem);
                    }}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={`text-xs font-medium ${
                          selectedValue &&
                          selectedValue.id === workOrderItem.id &&
                          "underline"
                        }`}
                      >
                        {workOrderItem.asset?.name}{" "}
                        {workOrderItem.location?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {workOrderItem.status}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                No results found
              </CommandEmpty>
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { WorkItemSelector };
