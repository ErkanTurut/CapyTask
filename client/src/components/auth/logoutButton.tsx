"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { catchError } from "@/utils";
import { trpc } from "@/trpc/client";

export function LogOutButtons() {
  const router = useRouter();
  const { mutate: signOut, isLoading } = trpc.auth.signOut.useMutation({
    onSuccess: async () => {
      toast.success("You have been logged out.");
      router.refresh();
      // router.push("/signin");
    },
    onError: (err) => {
      catchError(err);
    },
  });

  return (
    <div className="flex w-full items-center space-x-2">
      <Button
        onClick={() => signOut()}
        aria-label="Log out"
        size="sm"
        className="w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Log out
      </Button>

      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isLoading}
      >
        Go back
      </Button>
    </div>
  );
}
