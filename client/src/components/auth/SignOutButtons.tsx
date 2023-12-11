"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { catchError } from "@/utils";
import { trpc } from "@/trpc/client";
import { useAction } from "@/hooks/use-actions";
import { signout } from "@/lib/actions/auth/signout";

export function SignOutButtons() {
  const router = useRouter();

  const { run, fieldErrors, isLoading } = useAction(signout, {
    onSuccess: (data) => {
      toast.success("You have been logged out.");
      router.refresh();
      router.push("/signin");
    },
    onError: (err) => {
      catchError(err);
    },
  });

  return (
    <div className="flex w-full items-center space-x-2">
      <Button
        onClick={() => run({})}
        aria-label="Log out"
        size="sm"
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
        variant="destructive"
      >
        Sign out
      </Button>
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
      >
        Go back
      </Button>
    </div>
  );
}
