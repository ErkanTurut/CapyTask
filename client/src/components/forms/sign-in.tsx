"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { TSignInSchema, signInSchema } from "@/lib/validations/auth";
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
import { trpc } from "@/trpc/client";
import { Button } from "../ui/button";
import createSupabaseBrowserClient from "@/lib/supabase/browser";
import { signInWithPassword } from "@/lib/auth/actions";
import SubmitButton from "../submit-button";

export function SignInForm() {
  const router = useRouter();

  // react-hook-form
  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const { mutate: signIn, isLoading } =
  //   trpc.auth.signInWithPassword.useMutation({
  //     onSuccess: async () => {
  //       toast.success("Signed in successfully");
  //       router.refresh();
  //       //router.push("/");
  //     },
  //     onError: (err) => {
  //       catchError(err);
  //     },
  //   });

  async function onSubmit(data: TSignInSchema) {
    //signIn(data);
    try {
      await signInWithPassword(data);
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
