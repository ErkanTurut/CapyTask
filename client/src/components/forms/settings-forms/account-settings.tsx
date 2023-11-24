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

import type { user } from "@prisma/client";
import { updateUser } from "@/lib/services/user/actions";
import SubmitButton from "@/components/submit-button";

//@ts-ignore
// import { experimental_useFormState as useFormState } from "react-dom";

type Inputs = z.infer<typeof accountSettingsSchema>;

interface AccountFormProps {
  user: Pick<user, "first_name" | "last_name" | "email" | "image_uri" | "id">;
}

const AccountForm: FC<AccountFormProps> = ({ user }) => {
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
    updateUser(data, user.id);
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        action={(...args) => void form.handleSubmit(onSubmit)(...args)}
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
            <SubmitButton>Save</SubmitButton>
          </div>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
