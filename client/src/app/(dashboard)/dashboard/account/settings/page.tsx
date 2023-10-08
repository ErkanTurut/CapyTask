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
import { Suspense } from "react";

import AccountForm from "@/components/forms/settingsForms/accountSettings";
import type { user } from "@prisma/client";

import { PostgrestError } from "@supabase/supabase-js";
import getQueryClient from "@/lib/getQueryClient";
import Hydrate from "@/lib/hydrate";
import { dehydrate } from "@tanstack/query-core";

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user", user.id],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(await res.json());
        }
        const data = await res.json();

        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  const dehydratedState = dehydrate(queryClient);

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
            <Suspense fallback={<h1>loading</h1>}>
              <AccountForm user_id={user.id} />
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </Shell>
  );
}
