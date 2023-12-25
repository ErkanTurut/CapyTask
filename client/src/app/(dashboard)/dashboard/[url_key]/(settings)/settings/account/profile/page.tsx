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
import { getSession } from "@/lib/services/auth";

interface profilePageProps {}

export default async function profilePage({}: profilePageProps) {
  const {
    data: { session },
  } = await getSession();
  if (!session || !session.user) {
    redirect("/signin");
  }
  const { data: user } = await getUser(session.user.id);
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
