"use client";

import { useDebouncedCallback } from "use-debounce";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { VisuallyHidden } from "@/components/ui/vizually-hidden";
import { CommandLoading } from "cmdk";
import { useRef, useState } from "react";
interface ModalSearchCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setInputValue: (input: string) => void;
  isLoading: boolean;
  children: React.ReactNode;
}

export function ModalSearchCommand({
  open,
  setOpen,
  setInputValue,
  isLoading,
  children,
}: ModalSearchCommandProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleOnSearchChange = useDebouncedCallback((e: string) => {
    setIsTyping(false);
    if (e === "") {
      return;
    }
    setInputValue(e);
  }, 1000);

  const handleTyping = (e: string) => {
    setIsTyping(true);
    handleOnSearchChange(e);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <CommandInput
            ref={inputRef}
            onValueChange={isLoading ? undefined : handleTyping}
            placeholder="Type a command or search..."
          />
          <CommandList>
            {isLoading ? (
              <CommandLoading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandLoading>
            ) : null}

            <CommandGroup>{children}</CommandGroup>

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
      </DialogContent>
    </Dialog>
  );
}
