import { trpc } from "@/trpc/server";
import { headers as dynamic } from "next/headers";
import { SearchStep } from "../_components/search-step";

interface pageProps {
  searchParams: {
    q: string;
  };
  params: {
    url_key: string;
    team_identity: string;
    work_plan_template_id: string;
  };
}

export default async function Page({ searchParams, params }: pageProps) {
  dynamic();
  // const initialData =
  //   await trpc.db.work_step_template.getStepsByInspection.query({
  //     work_plan_template_id: params.work_plan_template_id,
  //   });

  const { data: searchStep } =
    await trpc.db.work_step_template.searchSteps.query({
      q: searchParams.q,
      team_identity: params.team_identity,
    });

  return (
    <SearchStep
      work_plan_template_id={params.work_plan_template_id}
      initialData={searchStep || []}
      searchParams={searchParams}
    />
  );
}
