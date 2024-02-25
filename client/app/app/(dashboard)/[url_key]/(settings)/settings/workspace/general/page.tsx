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
import { getWorkspace } from "@/lib/service/workspace/fetch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAvatar } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

interface workspaceGeneralProps {
  params: {
    url_key: string;
    team_url_key: string;
  };
}

export default async function workspaceGeneralPage({
  params,
}: workspaceGeneralProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: workspace } = await getWorkspace({
    url_key: params.url_key,
    supabase,
  });
  if (!workspace) {
    redirect("/404");
  }
  const { image_url, initials } = generateAvatar({
    name: workspace.name,
  });
  return (
    <section
      id="workspace-general-settings"
      aria-labelledby="workspace-general-settings"
    >
      <PageHeader
        className="pb-4"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          <Avatar className="h-10 w-10 rounded-sm  border-primary">
            <AvatarImage
              src={workspace.image_uri || image_url}
              alt={workspace.url_key}
            />
            <AvatarFallback className="h-5 w-5 rounded-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          {workspace.name}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Update your workspace information.
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>Update your account information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            {/* <AccountForm user={user} /> */}
          </Suspense>
        </CardContent>
      </Card>
    </section>
  );
}
