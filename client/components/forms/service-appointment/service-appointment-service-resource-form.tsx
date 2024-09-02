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
import { api, RouterOutput } from "@/trpc/client";
import { TCreateServiceAppointmentSchema } from "@/trpc/server/routes/service_appointment/create.schema";
import { useRef, useState } from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

import { useDebouncedCallback } from "use-debounce";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

interface ServiceAppointmentServiceResourceFormProps {
  form: UseFormReturn<TCreateServiceAppointmentSchema>;
}

export function ServiceAppointmentServiceResourceForm({
  form,
}: ServiceAppointmentServiceResourceFormProps) {
  const [value, setValue] = React.useState("");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "service_resource",
    keyName: "fieldId",
  });

  const { data: service_resource, isFetching } =
    api.db.service_resource.get.textSearch.useQuery(
      { search: value },
      { refetchOnMount: false },
    );

  const handleSelectServiceResource = (selectedId: string) => {
    const selectedResource = service_resource?.find(
      (resource) => resource.id === selectedId,
    );
    if (selectedResource) {
      const existingIndex = fields.findIndex(
        (field) => field.id === selectedId,
      );
      if (existingIndex >= 0) {
        remove(existingIndex);
      } else {
        append({
          id: selectedResource.id,
          first_name: selectedResource.user?.first_name || "",
          last_name: selectedResource.user?.last_name || "",
        });
      }
    }
  };

  return (
    <>
      <ServiceResourceComboBox
        selectedValues={fields.map((field) => field.id)}
        onSelect={handleSelectServiceResource}
        value={value}
        setValue={setValue}
        isLoading={isFetching}
        service_resource={service_resource ?? []}
      />
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div className="flex flex-col rounded-md border p-2" key={field.id}>
            <div className="flex items-center justify-between">
              <p className="text-xs">{field.first_name}</p>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  remove(index);
                }}
              >
                <Icons.trash className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <Badge variant={"success"}>available</Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

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
