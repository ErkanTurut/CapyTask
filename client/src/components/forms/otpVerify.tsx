"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { catchError } from "@/lib/utils";
import { verfifyEmailSchema } from "@/lib/validations/auth";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
type Inputs = z.infer<typeof verfifyEmailSchema>;

export async function OtpVerify() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const supabase = createClientComponentClient();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(verfifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: Inputs) {
    try {
      startTransition(async () => {
        console.log(await supabase.auth.getUser());
        // const res = await fetch("/auth/callback", {
        //   method: "GET",
        //   headers: { "Content-Type": "application/json" },
        // });
        // if (res.status === 400) {
        //   const json = await res.json();
        //   catchError(json);
        // }
      });
    } catch (err) {
      catchError(err);
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="169420"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} isLoading={isPending}>
          Create account
          <span className="sr-only">Create account</span>
        </Button>
      </form>
    </Form>
  );
}
