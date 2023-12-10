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
import { getSession } from "@/lib/auth";

export default async function CreatePage() {
  const { data } = await getSession();

  if (!data.session) {
    redirect("/signin");
  }

  return (
    <Shell variant="centered">
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Create</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Create your own workspace
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CreateWorspaceForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <Link
            aria-label="Reset password"
            href="/reset-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  );
}
