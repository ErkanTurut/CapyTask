import { cn } from "@/lib/utils";
import { type RouterOutput, api } from "@gembuddy/trpc/client";
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
import { Icons } from "@gembuddy/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@gembuddy/ui/popover";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface AssetSelectorProps {
  onSelect: (
    asset: NonNullable<
      RouterOutput["db"]["asset"]["get"]["textSearch"]["data"]
    >[number],
  ) => void;
  selectedValue?: NonNullable<
    RouterOutput["db"]["asset"]["get"]["textSearch"]["data"]
  >[number];
}

export function AssetSelector({ onSelect, selectedValue }: AssetSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { data: assets, isFetching } = api.db.asset.get.textSearch.useQuery(
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
          className="w-full justify-start font-normal "
          variant={"outline"}
          type="button"
        >
          <Icons.mix className="mr-2 h-4 w-4" />
          <span>{selectedValue?.name ?? "Select an asset"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-96 p-0 ")}
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
              {assets?.data?.map((asset) => (
                <CommandItem
                  key={asset.id}
                  value={asset.id}
                  onSelect={async () => {
                    onSelect?.(asset);
                  }}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span
                      className={`text-xs font-medium ${
                        selectedValue &&
                        selectedValue.id === asset.id &&
                        "underline"
                      }`}
                    >
                      {asset.name}
                    </span>

                    <span className="text-xs text-muted-foreground truncate max-h-14">
                      {asset.description}
                    </span>
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
