"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PasswordInput } from "@/components/passwordInput";
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

import { useAction } from "@/hooks/use-actions";
import { TSignIn, ZSignIn, signin } from "@/lib/actions/auth/signin";

export function SignInForm() {
  const router = useRouter();
  const { run, fieldErrors, isLoading } = useAction(signin, {
    onSuccess: (data) => {
      toast.success("Signed in successfully");
      router.refresh();
    },
    onError: (err) => {
      catchError(err);
    },
  });

  // react-hook-form
  const form = useForm<TSignIn>({
    resolver: zodResolver(ZSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: TSignIn) {
    run({ email: data.email, password: data.password });
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

        <Button isLoading={isLoading}>
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
