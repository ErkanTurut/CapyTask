"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { DateTimePickerPopover } from "@/components/date-time-picker-popover";
import { Icons } from "@/components/icons";
import { ComboBox } from "@/components/popoverCombobox";
import { Textarea } from "@/components/ui/textarea";
import { TCreateWorkOrderWithItemsSchema } from "@/trpc/server/routes/work_order/create.schema";
import { Database } from "@/types/supabase.types";
import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AutoComplete } from "@/components/autoComplete";
import CompanySearchForm from "./company-search-form";

export function General({
  form,
}: {
  form: UseFormReturn<TCreateWorkOrderWithItemsSchema>;
}) {
  const [open, setOpen] = React.useState(false);

  const hourRef = React.useRef<HTMLInputElement>(null);

  const workOrderType: Record<
    Database["public"]["Enums"]["WorkOrderType"],
    { icon: keyof typeof Icons; label: string }
  > = {
    INSPECTION: {
      icon: "view",
      label: "Inspection",
    },
    MAINTENANCE: {
      icon: "timer",
      label: "Maintenance",
    },
    OTHER: {
      icon: "check",
      label: "Other",
    },
  };

  const workOrderPriority: Record<
    Database["public"]["Enums"]["Priority"],
    { icon?: keyof typeof Icons; label: string }
  > = {
    HIGH: {
      label: "High",
    },
    LOW: {
      label: "Low",
    },
    MEDIUM: {
      label: "Medium",
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">General information</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the general information about the work order
        </p>
      </div>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea className="max-h-60" placeholder="example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <FormField
          control={form.control}
          name="sheduled_start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Start date
                <br />
              </FormLabel>
              <div className="flex items-center gap-1">
                <FormControl>
                  <DateTimePickerPopover
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={field.onChange}
                  />
                </FormControl>
                {field.value && (
                  <Button
                    variant="ghost"
                    size={"icon"}
                    type="reset"
                    onClick={() => field.onChange(undefined)}
                  >
                    <Icons.cross className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sheduled_end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                End date
                <br />
              </FormLabel>
              <div className="flex items-center gap-1">
                <FormControl>
                  <DateTimePickerPopover
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={field.onChange}
                  />
                </FormControl>
                {field.value && (
                  <Button
                    variant="ghost"
                    size={"icon"}
                    type="reset"
                    onClick={() => field.onChange(undefined)}
                  >
                    <Icons.cross className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Priority <span className="text-muted-foreground">(optional)</span>{" "}
              <br />
            </FormLabel>
            <FormControl>
              <ComboBox
                initialValue={field.value}
                options={Object.entries(workOrderPriority).map(
                  ([status, { icon, label }]) => ({
                    value: status as Database["public"]["Enums"]["Priority"],
                    label,
                    icon,
                  }),
                )}
                onSelect={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Type
              <br />
            </FormLabel>
            <FormControl>
              <ComboBox
                initialValue={field.value}
                options={Object.entries(workOrderType).map(
                  ([status, { icon, label }]) => ({
                    value:
                      status as Database["public"]["Enums"]["WorkOrderType"],
                    label,
                    icon,
                  }),
                )}
                onSelect={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <CompanySearchForm form={form} />
    </div>
  );
}
