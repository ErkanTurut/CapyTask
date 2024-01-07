import AccountForm from "@/components/form/user-settings";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { redirect } from "next/navigation";

import { getUser } from "@/lib/service/user/fetch";
import { Suspense } from "react";
import { getSession } from "@/lib/service/auth/fetch";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

interface profilePageProps {}

export default async function profilePage({}: profilePageProps) {
  const {
    data: { session },
  } = await getSession();
  if (!session || !session.user) {
    redirect("/login");
  }
  const { data: user } = await getUser(session.user.id);
  if (!user) {
    redirect("/login");
  }
  return (
    <section id="user-account-info" aria-labelledby="user-account-info-heading">
      <PageHeader
        className="pb-4"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
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
