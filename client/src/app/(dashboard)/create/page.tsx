import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Shell } from "@/components/shells/shell";
import { redirect } from "next/navigation";

import { CreateWorspaceForm } from "@/components/workspace/workspace-create";
import Link from "next/link";
import { getSession } from "@/lib/services/auth";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default async function CreatePage() {
  const { data } = await getSession();

  if (!data.session) {
    redirect("/signin");
  }

  return (
    <div className="grid min-h-screen">
      <div className="container max-w-3xl my-auto ">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create workspace</CardTitle>
            <CardDescription>
              Create a new workspace to work on.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <CreateWorspaceForm />
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <Link
              aria-label="Return to home page"
              href="/"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              Return to home page
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
