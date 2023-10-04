"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";

export function LogOutButtons() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const onLogout = async () => {
    startTransition(() => {
      toast.promise(
        fetch("api/auth/sign-out", {
          method: "POST",
        }).then((res) => {
          if (res.ok) {
            router.refresh();
            return router.push(res.url);
          }
        }),
        {
          loading: "Logging out...",
          success: "You have been logged out.",
          error: "An error occurred while logging out.",
        }
      );
    });
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Button
        onClick={onLogout}
        aria-label="Log out"
        size="sm"
        className="w-full"
        disabled={isPending}
        isLoading={isPending}
      >
        Log out
      </Button>

      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  );
}
