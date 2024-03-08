import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Suspense } from "react";

import CreatePlanForm from "@/components/plan/plan-create";
import { getTeamByIdentity } from "@/lib/service/team/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Modal } from "@/components/modal";

interface createPageProps {
  params: {
    team_identity: string;
    url_key: string;
  };
}

export default async function createPage({ params }: createPageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: team } = await getTeamByIdentity({
    identity: params.team_identity,
    supabase,
  });
  if (!team) return null;
  return (
    <Shell variant={"markdown"}>
      <Card>
        <CardHeader>
          <CardTitle>Plan information</CardTitle>
          <CardDescription>
            Fill in the details below to create your new plan. This information
            will be displayed to your team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <CreatePlanForm team={team} url_key={params.url_key} />
          </Suspense>
        </CardContent>
      </Card>
    </Shell>
  );
}
