import type { Metadata } from "next";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Shell } from "@/components/shells/shell";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function JoinPage() {
  const { data } = await getSession();

  if (!data.session) {
    redirect("/signin");
  }

  return (
    <Shell variant="centered" className="max-w-xl">
      <PageHeader
        id="sign-out-page-header"
        aria-labelledby="sign-out-page-header-heading"
        className="text-center"
      >
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Are you sure you want to sign out?
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
