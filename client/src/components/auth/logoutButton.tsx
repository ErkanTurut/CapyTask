"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import { catchError } from "@/utils";

export function LogOutButtons() {
  const router = useRouter();

  const { mutate: signOut, isLoading } = trpc.auth.signOut.useMutation({
    onSuccess: async () => {
      toast.success("You have been logged out.");
      router.refresh();
      router.push("/signin");
    },
    onError: (err) => {
      catchError(err);
    },
  });

  const onClick = async () => {
    signOut();
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Button
        onClick={onClick}
        aria-label="Log out"
        size="sm"
        className="w-full"
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
        isLoading={isLoading}
      >
        Go back
      </Button>
    </div>
  );
}
