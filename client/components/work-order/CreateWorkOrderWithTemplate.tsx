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
  CommandList,
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

import { Button, buttonVariants } from "@/components/ui/button";

import { api } from "@/trpc/client";
import {
  TCreateWorkOrderWithTemplateSchema,
  ZCreateWorkOrderWithTemplateSchema,
} from "@/trpc/server/routes/work_order/create.schema";
import type { trpc } from "@/trpc/server";
import { useParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { Icons } from "../icons";
import { Textarea } from "@/ui/textarea";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CreateWorkOrderWithTemplateProps
  extends React.HTMLAttributes<HTMLFormElement> {
  initialData: NonNullable<
    Awaited<ReturnType<(typeof trpc)["db"]["work_plan_template"]["search"]>>
  >;
}

export function CreateWorkOrderWithTemplate({
  className,
  initialData,
}: CreateWorkOrderWithTemplateProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const { team_identity } = useParams() as { team_identity: string };
  const utils = api.useUtils();
  const { mutate, isPending } =
    api.db.work_order.create.withTemplate.useMutation({
      onSuccess: async (data) => {
        toast.success("work order created successfully");
        form.reset();
        utils.db.work_order.get.invalidate(undefined, {
          refetchType: "all",
        });
        // router.push(`./${data.id}`);
      },
      onError: (err) => {
        console.log(err);
        catchError(new Error(err.message));
      },
    });

  const { data: work_plan_template } =
    api.db.work_plan_template.search.useQuery(
      {
        q: query,
        team_identity,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        initialData,
      },
    );

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const parsedValue = z.string().min(4).safeParse(value);
    if (parsedValue.success) {
      console.log(parsedValue.data);
      setQuery(parsedValue.data);
    }
  }, 1000);

  // react-hook-form

  const form = useForm<TCreateWorkOrderWithTemplateSchema>({
    resolver: zodResolver(ZCreateWorkOrderWithTemplateSchema),
    defaultValues: {
      name: "",
      description: "",
      work_plan_template: {
        id: "",
      },
      company_id: "",
      location_id: "",
    },
  });

  function onSubmit(data: TCreateWorkOrderWithTemplateSchema) {
    mutate(data);
  }
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
                <Textarea
                  placeholder="Type your message here."
                  {...field}
                  value={field.value || undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="work_plan_template.id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Work order template</FormLabel>
              <Popover>
                <div className="flex items-center gap-2">
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
                          : "Select template"}
                        <Icons.caretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  {field.value && (
                    <Tooltip>
                      <TooltipTrigger className="group">
                        <Link
                          className={buttonVariants({
                            size: "icon",
                            variant: "ghost",
                          })}
                          href={`/work-plan-template/${field.value}`}
                        >
                          <Icons.ArrowTopRight className="h-4 w-4 animate-fade-in-right transition duration-300 group-hover:-rotate-45" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>view selected template</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      onValueChange={(value) => debouncedSearch(value)}
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {work_plan_template &&
                          work_plan_template.map((work_plan_template) => (
                            <CommandItem
                              value={work_plan_template.name}
                              key={work_plan_template.id}
                              onSelect={() => {
                                if (work_plan_template.id === field.value) {
                                  form.setValue("work_plan_template.id", "");
                                } else {
                                  form.setValue(
                                    "work_plan_template.id",
                                    work_plan_template.id,
                                  );
                                }
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
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the template that will be used to create the work order.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={!form.formState.isDirty} isLoading={isPending}>
          Create now
          <span className="sr-only">Create now</span>
        </Button>
      </form>
    </Form>
  );
}
