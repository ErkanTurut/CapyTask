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

interface ServiceResourceSelectorProps {
  onSelect: (
    serviceResource: NonNullable<
      RouterOutput["db"]["service_resource"]["get"]["textSearch"]["data"]
    >[number],
  ) => void;
  selectedValues?: RouterOutput["db"]["service_resource"]["get"]["textSearch"];
}

export default function ServiceResourceSelector({
  onSelect,
  selectedValues,
}: ServiceResourceSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { data: service_resource, isFetching } =
    api.db.service_resource.get.textSearch.useQuery(
      { search: searchValue },
      {
        refetchOnMount: false,
        initialData: selectedValues,
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
          <Icons.search className="mr-2 h-4 w-4" />
          <span>Select Employee</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-72 p-0 sm:w-60 md:w-80")}
        align="center"
        onCloseAutoFocus={(e) => e.preventDefault()}
        sideOffset={6}
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
              {service_resource?.data?.map((service_resource) => (
                <CommandItem
                  key={service_resource.id}
                  value={service_resource.id}
                  onSelect={async () => {
                    onSelect?.(service_resource);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Icons.checkCircled
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues?.data
                          ?.map((sr) => sr.id)
                          .includes(service_resource.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    <span>
                      {service_resource.first_name} {service_resource.last_name}
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
