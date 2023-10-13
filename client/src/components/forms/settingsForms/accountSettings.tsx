"use client";

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
import { accountSettingsSchema } from "@/lib/validations/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { FC, useEffect } from "react";

import { getUser, updateUser } from "@/hooks/useUser";

type Inputs = z.infer<typeof accountSettingsSchema>;

interface AccountFormProps {
  user_id: string;
}

const AccountForm: FC<AccountFormProps> = ({ user_id }) => {
  const { data: user } = getUser(user_id);
  const { mutate, isPending } = updateUser(user_id);

  const form = useForm<Inputs>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    },
  });

  useEffect(() => {
    form.reset({
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    });
  }, [user]);

  async function onSubmit(data: Inputs) {
    mutate(data);
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
        {(form.formState.isDirty || isPending) && (
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
            <Button isLoading={isPending}>
              Save
              <span className="sr-only">Save</span>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
