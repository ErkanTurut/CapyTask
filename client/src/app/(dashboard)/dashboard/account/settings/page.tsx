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

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/signin");

  return (
    <section id="user-account-info" aria-labelledby="user-account-info-heading">
      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>Update your account information.</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountForm user_id={user.id} />
        </CardContent>
      </Card>
    </section>
  );
}
