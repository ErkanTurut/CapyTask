"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { catchError } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { api } from "@/trpc/client";
import {
  TCreateWorkspaceSchema,
  ZCreateWorkspaceSchema,
} from "@/trpc/routes/workspace/create.schema";

export function CreateWorspaceForm() {
  const router = useRouter();
  const { mutate, isPending } = api.db.workspace.create.useMutation({
    onSuccess: (data, variables) => {
      toast.success("Workspace created successfully");
      router.replace(`/${variables.url_key}`);
    },
    onError: (err) => {
      catchError(new Error(err.message));
    },
  });

  const form = useForm<TCreateWorkspaceSchema>({
    resolver: zodResolver(ZCreateWorkspaceSchema),
    defaultValues: {
      name: "",
      url_key: "",
    },
  });

  async function onSubmit(data: TCreateWorkspaceSchema) {
    // test({ name: data.name });
    mutate({ name: data.name, url_key: data.url_key });
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>
              <FormControl>
                <Input placeholder="example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Url</FormLabel>
              <FormControl>
                <Input
                  className="lowercase"
                  placeholder="gembuddy.app/"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isPending}>
          Create now
          <span className="sr-only">Create now</span>
        </Button>
      </form>
    </Form>
  );
}
