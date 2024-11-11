"use client";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { api, RouterOutput } from "@gembuddy/trpc/client";
import { Button } from "@gembuddy/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@gembuddy/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@gembuddy/ui/popover";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface ServiceResourceSelectorProps {
  onSelect: (
    location: NonNullable<
      RouterOutput["db"]["location"]["get"]["textSearch"]["data"]
    >[number],
  ) => void;
  selectedValue?: NonNullable<
    RouterOutput["db"]["location"]["get"]["textSearch"]["data"]
  >[number];
}

function LocationSelector({
  onSelect,
  selectedValue,
}: ServiceResourceSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { data: locations, isFetching } =
    api.db.location.get.textSearch.useQuery(
      { search: searchValue },
      {
        refetchOnMount: false,
        initialData: selectedValue && { data: [selectedValue] },
        enabled: Boolean(searchValue),
      },
    );

  const handleOnSearchChange = useDebouncedCallback(async (e: string) => {
    setIsTyping(false);
    if (e === "") {
      return;
    }
    setSearchValue(e);
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
      }}
    >
      <PopoverTrigger asChild>
        <Button
          isLoading={isFetching}
          className="w-72 justify-start font-normal sm:w-60 md:w-80"
          variant={"outline"}
          type="button"
        >
          <Icons.SewingPin className="mr-2 h-4 w-4" />
          <span>{selectedValue?.name ?? "Select a location"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-72 p-0 sm:w-60 md:w-80")}
        align="center"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
        side="top"
      >
        <Command shouldFilter={false} className="rounded-sm">
          <CommandInput
            onValueChange={isFetching ? undefined : handleTyping}
            className="text-xs leading-normal"
            placeholder="Type to search..."
            ref={inputRef}
          />
          <CommandList>
            <CommandGroup>
              {locations?.data?.map((location) => (
                <CommandItem
                  key={location.id}
                  value={location.id}
                  onSelect={async () => {
                    onSelect?.(location);
                  }}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span
                      className={`text-xs font-medium ${
                        selectedValue &&
                        selectedValue.id === location.id &&
                        "underline"
                      }`}
                    >
                      {location.name} ({location.location_type})
                    </span>
                    <address className="text-xs text-muted-foreground">
                      {location.address?.street}, {location.address?.state}{" "}
                      {location.address?.postal_code}, {location.address?.city},{" "}
                      {location.address?.country}
                    </address>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            {!isFetching && isTyping && (
              <CommandLoading className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                Listening...
              </CommandLoading>
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

export { LocationSelector };
