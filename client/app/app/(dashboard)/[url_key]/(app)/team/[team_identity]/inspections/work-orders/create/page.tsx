import CreateInspectionForm from "@/components/inspection/inspection-create";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import CreateTeamForm from "@/components/team/team-create";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { trpc } from "@/trpc/server";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

interface createInspectionProps {
  params: {
    url_key: string;
    team_identity: string;
  };
}

export default async function createInspection({
  params,
}: createInspectionProps) {
  const { data: team } = await trpc.db.team.getByIdentity.query({
    identity: params.team_identity,
  });
  if (!team) {
    notFound();
  }
  return (
    <Shell variant="markdown" className="gap-2">
      <PageHeader
        className="pb-4"
        id="account-header"
        aria-labelledby="account-header-heading"
      >
        <PageHeaderHeading size="sm" className="flex items-center gap-1">
          Create a new work order
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">Create</PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Create work order</CardTitle>
          <CardDescription>
            Fill in the details below to create your new work order. This
            information will be displayed to your team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <CreateInspectionForm team_id={team.id} />
          </Suspense>
        </CardContent>
      </Card>
    </Shell>
  );
}
