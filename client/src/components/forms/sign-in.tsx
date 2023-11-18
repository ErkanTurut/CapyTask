"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { signInSchema } from "@/lib/validations/auth";
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
import { PasswordInput } from "@/components/passwordInput";

import { toast } from "sonner";
import { catchError } from "@/utils";
import SubmitButton from "../submit-button";
import { signInWithPassword } from "@/lib/auth/actions";
import type { AuthResponse } from "@supabase/supabase-js";

type Inputs = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: Inputs) {
    try {
      const res = JSON.parse(await signInWithPassword(data)) as AuthResponse;
      if (res.error) {
        throw new Error(res.error.message);
      }
      toast.success("Signed in successfully");
      router.refresh();
      router.push("/dashboard");
    } catch (err) {
      catchError(err);
    }
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
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton>
          Sign in
          <span className="sr-only">Sign in</span>
        </SubmitButton>
      </form>
    </Form>
  );
}
