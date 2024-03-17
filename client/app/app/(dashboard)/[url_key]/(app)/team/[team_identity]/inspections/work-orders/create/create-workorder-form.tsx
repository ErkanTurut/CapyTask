"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { trpc } from "@/trpc/server";
import {
  TCreateWorkOrderSchema,
  ZCreateWorkOrderSchema,
} from "@/trpc/routes/work_order/create.schema";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/client";
import { useDebouncedCallback } from "use-debounce";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

export function CreateWorkOrderForm({
  plans,
  team,
}: {
  plans: Awaited<
    ReturnType<(typeof trpc)["db"]["plan"]["getPlansByIdentity"]["query"]>
  >["data"];
  team: NonNullable<
    Awaited<
      ReturnType<(typeof trpc)["db"]["team"]["getByIdentity"]["query"]>
    >["data"]
  >;
}) {
  if (!plans) return null;

  const { mutate: create } = api.db.work_order.create.useMutation({
    onSuccess() {
      toast.success("Work order created");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const {
    mutate: search,
    data: searchPlans,
    isPending,
  } = api.db.plan.searchPlan.useMutation();

  const debouncedValue = useDebouncedCallback(async (value: string) => {
    if (!value) return;
    search({ q: value, team_identity: team.identity });
  }, 3000);

  const form = useForm<TCreateWorkOrderSchema>({
    resolver: zodResolver(ZCreateWorkOrderSchema),
    defaultValues: {
      description: "",
      name: "",
      inspection_template_id: "",
      team_id: team.id,
    },
  });
  function onSubmit(data: TCreateWorkOrderSchema) {
    create(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="team_id"
          render={({ field }) => <Input type="hidden" {...field} />}
        />
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
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inspection_template_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Plan template</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[250px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? plans.find((plan) => plan.id === field.value)?.name
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search plan..."
                      className="h-9"
                      onValueChange={(e) => debouncedValue(e)}
                    />
                    <CommandEmpty>No plan found.</CommandEmpty>
                    <CommandGroup heading="Recent">
                      {plans.map((plan) => (
                        <CommandItem
                          value={plan.name}
                          key={plan.id}
                          onSelect={() => {
                            form.setValue("inspection_template_id", plan.id);
                          }}
                        >
                          {plan.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              plan.id === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    {searchPlans &&
                      searchPlans.data &&
                      searchPlans.data.length > 0 && (
                        <CommandGroup heading="Research">
                          {searchPlans.data.map((plan) => (
                            <CommandItem
                              key={plan.id}
                              value={plan.name}
                              onSelect={() => {
                                form.setValue(
                                  "inspection_template_id",
                                  plan.id,
                                );
                              }}
                            >
                              {plan.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",

                                  plan.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
