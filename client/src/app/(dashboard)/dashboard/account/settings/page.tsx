import { Shell } from "@/components/shells/shell";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import AccountForm from "@/components/forms/settings-forms/account-settings";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { redirect } from "next/navigation";

import { getUser } from "@/lib/services/user";

import { Suspense } from "react";

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return redirect("/signin");

  const user = await getUser(session.user.id);

  if (!user) return redirect("/signin");

  return (
    <section id="user-account-info" aria-labelledby="user-account-info-heading">
      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>Update your account information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <AccountForm user={user} />
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
}
