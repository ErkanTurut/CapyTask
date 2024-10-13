
import { trpc } from "@gembuddy/trpc/server";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: {
    step_id: string | null;
  };
  params: {
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  };
}

export default async function Page({ searchParams, params }: PageProps) {
  const work_plan_template = await trpc.db.work_plan_template.get.byId({
    id: params.work_plan_template_id,
  });

  if (!work_plan_template) {
    return notFound();
  }

  return (
    <div>
      <h1>Work Plan Template</h1>
      <p>{work_plan_template.data?.name}</p>
    </div>
  );
}
