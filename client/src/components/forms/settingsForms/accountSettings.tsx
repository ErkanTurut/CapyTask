"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { catchError } from "@/lib/utils";
import { accountSettingsSchema } from "@/lib/validations/settings";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

import { toast } from "sonner";

import { getUser, updateUser } from "@/hooks/useUser";

type Inputs = z.infer<typeof accountSettingsSchema>;

export default function AccountForm() {
  const { data: user } = getUser("95d21c50-d3fa-4010-8341-93c1daec6f63");

  if (!user) return null;

  const form = useForm<Inputs>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
    },
  });

  async function onSubmit(data: Inputs) {
    try {
      //mutate(data);
    } catch (error) {
      catchError(error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>first name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.isDirty && (
          <div className="flex justify-end gap-2 transition-all ">
            <Button
              variant="secondary"
              onClick={() => {
                form.reset();
              }}
            >
              Cancel
              <span className="sr-only">cancel</span>
            </Button>
            <Button isLoading={false}>
              Save
              <span className="sr-only">Save</span>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
