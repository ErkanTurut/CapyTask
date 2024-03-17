"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/client";
import { trpc } from "@/trpc/server";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";

interface WorkPlanSelectorProps {
  initialData: NonNullable<
    Awaited<
      ReturnType<
        (typeof trpc)["db"]["work_order"]["getInspectionsByIdentity"]["query"]
      >
    >
  >;

  params: {
    team_identity: string;
  };
}

export function WorkPlanSelector({
  initialData: { data: plans },
  params,
}: WorkPlanSelectorProps) {
  const {
    mutate,
    data: searchInspection,
    isPending,
  } = api.db.template.inspection.searchInspection.useMutation();
  if (!plans) {
    return (
      <Link
        href="/app/teams/create"
        className={buttonVariants({ variant: "outline" })}
      >
        Create a plan
      </Link>
    );
  }

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const debouncedValue = useDebouncedCallback(async (value: string) => {
    mutate({ q: value, team_identity: params.team_identity });
  }, 1000);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? plans.find((plan) => plan.id === value)?.name
            : "Select work plan..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder="Search work plan template..."
            className="h-9"
            onValueChange={(e) => debouncedValue(e)}
          />
          {/* {isPending && <CommandLoading>Loading...</CommandLoading>} */}
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading="Create a new plan">
              <CommandItem>
                <Link href="/app/teams/create">Create a new plan</Link>
              </CommandItem>
            </CommandGroup>
            {searchInspection &&
              searchInspection.data &&
              searchInspection.data.length > 0 && (
                <CommandGroup heading="Research">
                  {searchInspection?.data?.map((inspection) => (
                    <CommandItem
                      key={inspection.id}
                      value={inspection.name}
                      onSelect={() => {
                        setValue(plan.id);
                        setOpen(false);
                      }}
                    >
                      {plan.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",

                          value === plan.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

            <CommandGroup heading="Recent">
              {plans.map((plan) => (
                <CommandItem
                  key={plan.id}
                  value={plan.name}
                  onSelect={() => {
                    setOpen(false);
                    setValue(plan.id);
                  }}
                >
                  {plan.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === plan.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

{
  /* <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("language", language.value)
                          }}
                        >
                          {language.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form> */
}
