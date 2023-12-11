import type { Metadata } from "next";

import { SignOutButtons } from "@/components/auth/SignOutButtons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import { Shell } from "@/components/shells/shell";
import { Button } from "@/components/ui/button";

export default function SignOutPage() {
  return (
    <Shell className="max-w-xs">
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
      <SignOutButtons />
    </Shell>
  );
}
