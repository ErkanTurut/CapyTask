"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { catchError } from "@/lib/utils";
import { otpCodeSchema } from "@/lib/validations/auth";
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
import { VerifyOtpParams } from "@supabase/gotrue-js/dist/main/lib/types";
import { set } from "date-fns";
import { on } from "events";
import { start } from "repl";
import { ca } from "date-fns/locale";

type Inputs = z.infer<typeof otpCodeSchema>;

export function OtpVerify(otpParams: VerifyOtpParams) {
  const router = useRouter();

  const [isPending, setIsPending] = React.useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(otpCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(data: Inputs) {
    try {
      setIsPending(true);
      toast.promise(
        fetch("/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: data.code,
            nextUrl: "/signin",
            ...otpParams,
          }),
        }).then(async (res) => {
          setIsPending(false);
          if (res.ok) {
            router.refresh();
            return router.push(res.url);
          } else {
            catchError(new Error(await res.json()));
            throw new Error(await res.json());
          }
        }),
        {
          loading: "Verifying...",
          success: "You have been verified!",
          error: "An error occurred while verifying.",
        }
      );
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
                    console.log(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Create account
          <span className="sr-only">Create account</span>
        </Button>
      </form>
    </Form>
  );
}
