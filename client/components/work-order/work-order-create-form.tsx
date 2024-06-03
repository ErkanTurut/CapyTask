"use client";

import React, { useState } from "react";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { catchError, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { api } from "@/trpc/client";
import {
  TCreateWorkOrderSchema,
  ZCreateWorkOrderSchema,
} from "@/trpc/routes/work_order/create.schema";
import { FC } from "react";
import { Icons } from "../icons";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

interface CreateWorkOrderFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

const CreateWorkOrderForm: FC<CreateWorkOrderFormProps> = ({ className }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const utils = api.useUtils();
  const { mutate, isPending } = api.db.work_order.create.useMutation({
    onSuccess: async (data) => {
      toast.success("Team created successfully");
      form.reset();
      utils.db.work_order.get.invalidate(undefined, {
        refetchType: "all",
      });
      // router.push(`./${data.id}`);
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  // const { data: work_plan_template } =
  //   api.db.work_plan_template.search.useQuery(
  //     {
  //       q: search,
  //       team_id,
  //     },
  //     { placeholderData: [], refetchOnWindowFocus: false },
  //   );

  const debouncedSearch = useDebouncedCallback(
    (query: string) => setSearch(query),
    1000,
  );

  // react-hook-form
  const form = useForm<TCreateWorkOrderSchema>({
    resolver: zodResolver(ZCreateWorkOrderSchema),
    defaultValues: {
      name: "",
      description: "",
      work_plan_template_id: "",
    },
  });

  // async function onSubmit(data: TCreateWorkOrderSchema) {
  //   mutate(data);
  // }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work order name</FormLabel>
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
              <FormLabel>Work order description</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="work_plan_template_id"
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
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value && work_plan_template
                        ? work_plan_template.find(
                            (work_plan_template) =>
                              work_plan_template.id === field.value,
                          )?.name
                        : "Select language"}
                      <Icons.caretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      onValueChange={(value) => debouncedSearch(value)}
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {work_plan_template &&
                        work_plan_template.map((work_plan_template) => (
                          <CommandItem
                            value={work_plan_template.name}
                            key={work_plan_template.id}
                            onSelect={() => {
                              form.setValue(
                                "work_plan_template_id",
                                work_plan_template.id,
                              );
                            }}
                          >
                            {work_plan_template.name}
                            <Icons.checkCircled
                              className={cn(
                                "ml-auto h-4 w-4",
                                work_plan_template.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
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
        /> */}

        <Button disabled={!form.formState.isDirty} isLoading={isPending}>
          Create now
          <span className="sr-only">Create now</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreateWorkOrderForm;
