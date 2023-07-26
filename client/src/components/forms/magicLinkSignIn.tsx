"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "sonner";
import { catchClerkError } from "@/lib/utils";
import { checkEmailSchema } from "@/lib/validations/auth";
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
import { PasswordInput } from "@/components/passwordInput";
import { start } from "repl";

type Inputs = z.infer<typeof checkEmailSchema>;

export function MagicLinkSignInForm() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, startTransition] = React.useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: Inputs) {
    if (!isLoaded) return;

    startTransition(async () => {
      const { startMagicLinkFlow, cancelMagicLinkFlow } =
        await signIn.createMagicLinkFlow();
      try {
        const { supportedFirstFactors } = await signIn.create({
          identifier: data.email,
        });

        const firstEmailFactor = supportedFirstFactors.find((factor) => {
          return factor.strategy === "email_code";
        });
        // @ts-ignore
        const { emailAddressId } = firstEmailFactor ?? {};

        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: emailAddressId,
        });

        router.push("/signin/verify-email");
        toast.message("Check your email", {
          description: "We sent you a 6-digit verification code.",
        });
        toast.message("Check your email", {
          description: "We sent you a 6-digit verification code.",
        });
      } catch (err) {
        catchClerkError(err);
      }
    });
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
                <Input placeholder="capybaraKing@gmail.com" {...field} />
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
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
