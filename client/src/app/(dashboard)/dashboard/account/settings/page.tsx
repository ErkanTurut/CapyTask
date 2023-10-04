import type { Metadata } from "next";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Shell } from "@/components/shells/shell";

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

import AccountForm from "@/components/forms/settingsForms/accountSettings";
import type { user } from "@prisma/client";

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: user, error }: { data: user | null; error: any } =
    await supabase.from("user").select().single();

  if (user === null) return null;
  return (
    <Shell variant="sidebar" className="max-w-2xl">
      <PageHeader id="account-header" aria-labelledby="account-header-heading">
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
      >
        <Card>
          <CardHeader>
            <CardTitle>Account Info</CardTitle>
            <CardDescription>Update your account information.</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm user={user} />
          </CardContent>
        </Card>
      </section>
    </Shell>
  );
}
