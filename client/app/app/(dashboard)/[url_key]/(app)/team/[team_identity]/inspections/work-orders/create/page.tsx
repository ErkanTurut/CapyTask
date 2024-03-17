import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import { trpc } from "@/trpc/server";
import { CreateWorkOrderForm } from "./create-workorder-form";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    team_identity: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { data: plans } = await trpc.db.plan.getPlansByIdentity.query({
    team_identity: params.team_identity,
    range: {
      start: 0,
      end: 10,
    },
  });
  const { data: team } = await trpc.db.team.getByIdentity.query({
    identity: params.team_identity,
  });
  if (!team) notFound();

  return (
    <Shell variant={"markdown"}>
      <Shell variant={"dashboard"}>
        <PageHeader
          id="account-header"
          aria-labelledby="account-header-heading"
        >
          <PageHeaderHeading size="sm">Create work order</PageHeaderHeading>
          <PageHeaderDescription size="sm">
            fill in the form to create a work order
          </PageHeaderDescription>
        </PageHeader>
        <CreateWorkOrderForm plans={plans} team={team} />
      </Shell>
    </Shell>
  );
}
