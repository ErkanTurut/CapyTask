import type { Metadata } from "next";

import { LogOutButtons } from "@/components/auth/logoutButton";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Shell } from "@/components/shells/shell";
import { getUserSession } from "@/lib/services/user";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const { data } = await getUserSession();

  if (!data.session) {
    redirect("/signin");
  }

  return (
    <Shell variant="centered" className="max-w-xs">
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
    </Shell>
  );
}
