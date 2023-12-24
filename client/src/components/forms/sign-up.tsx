"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { PasswordInput } from "@/components/passwordInput";
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

import { catchError } from "@/lib/utils";

import { useAction } from "@/hooks/use-actions";
import { signup, TSignUp, ZSignUp } from "@/lib/actions/auth/signup";

export function SignUpForm() {
  const router = useRouter();

  // react-hook-form
  const form = useForm<TSignUp>({
    resolver: zodResolver(ZSignUp),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { run, fieldErrors, isLoading } = useAction(signup, {
    onSuccess: (data) => {
      toast.message("Check your email", {
        description: "We sent you a link to verify your email address.",
      });
      router.refresh();
      router.push(`/signin`);
    },
    onError: (err) => {
      catchError(err);
    },
  });

  async function onSubmit(data: TSignUp) {
    run(data);
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
                <Input placeholder="rodneymullen180@gmail.com" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel> confirm the password </FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading}>
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
