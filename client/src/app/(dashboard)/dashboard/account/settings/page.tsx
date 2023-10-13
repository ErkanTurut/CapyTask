import { Shell } from "@/components/shells/shell";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import AccountForm from "@/components/forms/settingsForms/accountSettings";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/pageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

import { HydrationBoundary } from "@tanstack/react-query";

import { redirect } from "next/navigation";
import { prefetchUser } from "@/hooks/useUser";

const dehydratedState = async (user_id: string) => {
  return await prefetchUser(user_id);
};

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/signin");

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
            <HydrationBoundary state={dehydratedState(user.id)}>
              <Suspense fallback={<div>Loading...</div>}>
                <AccountForm user_id={user.id} />
              </Suspense>
            </HydrationBoundary>
          </CardContent>
        </Card>
      </section>
    </Shell>
  );
}
