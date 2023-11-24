"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signOut } from "@/lib/auth/actions";

export function LogOutButtons() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const onLogout = async () => {
    signOut();
    router.refresh();
    toast.success("You have been logged out.");
    router.push("/signin");
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
