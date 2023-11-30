import AccountForm from "@/components/forms/settings-forms/account-settings";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { redirect } from "next/navigation";

import { Suspense } from "react";
import { serverClient } from "@/trpc/serverClient";

export default async function SettingsPage() {
  const user = await serverClient.user.getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

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
