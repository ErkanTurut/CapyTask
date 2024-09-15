"use client";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import { api, RouterOutput } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandLoading,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

interface ServiceResourceSelectorProps {
  onSelect: (
    serviceResource: RouterOutput["db"]["service_resource"]["get"]["textSearch"][number],
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
              {service_resource?.map((service_resource) => (
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
                        selectedValues
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
