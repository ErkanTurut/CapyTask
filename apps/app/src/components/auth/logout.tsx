"use client";

import { useRouter } from "next/navigation";

import { Button } from "@gembuddy/ui/button";
// import { signout } from "@/lib/service/auth/actions/signout";

export function Logout() {
  const router = useRouter();

  // const { run, fieldErrors, isLoading } = useAction(signout, {
  //   onSuccess: (data) => {
  //     toast.success("You have been logged out.");
  //     router.refresh();
  //     router.push("/login");
  //   },
  //   onError: (err) => {
  //     catchError(err);
  //   },
  // });

  return (
    <div className="flex w-full items-center space-x-2">
      <Button
        // onClick={() => run({})}
        aria-label="Log out"
        size="sm"
        className="w-full"
        // disabled={isLoading}
        // isLoading={isLoading}
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
