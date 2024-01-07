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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FC } from "react";

import { catchError } from "@/lib/utils";
import { toast } from "sonner";

import { useAction } from "@/lib/hooks/use-actions";
import {
  updateUser,
  TAccountUpdate,
  ZAccountUpdate,
} from "@/lib/service/user/actions/update";
import { useUser } from "@/lib/store";
import { Database } from "@/types/supabase.types";

interface AccountFormProps {
  user: Database["public"]["Tables"]["user"]["Row"];
}

const AccountForm: FC<AccountFormProps> = ({ user }) => {
  const setUser = useUser()((state) => state.setUser);

  const form = useForm<TAccountUpdate>({
    resolver: zodResolver(ZAccountUpdate),
    defaultValues: {
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    },
  });

  const { run, isLoading, data } = useAction(updateUser, {
    onSuccess: (data) => {
      toast.success("Updated successfully");
      form.reset({
        email: data?.email || "",
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
      });
      setUser(data);
    },
    onError: (err) => {
      catchError(err);
    },
  });

  async function onSubmit(data: TAccountUpdate) {
    run(data);
  }

  return (
    <>
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
              <Button isLoading={isLoading}>Save</Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default AccountForm;
