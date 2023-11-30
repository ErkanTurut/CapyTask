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
import { signInSchema, TSignInSchema } from "@/lib/validations/auth";

import { catchError } from "@/utils";
import { toast } from "sonner";

// import { serverClient } from "@/trpc/serverClient";
import { trpc } from "@/trpc/client";
import { Button } from "../ui/button";

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

  const { mutate: signIn, isLoading } =
    trpc.auth.signInWithPassword.useMutation({
      onSuccess: async () => {
        toast.success("Signed in successfully");
        router.refresh();
        router.push("/dashboard");
      },
      onError: (err) => {
        catchError(err);
      },
    });

  async function onSubmit(data: TSignInSchema) {
    signIn(data);
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
