import { getPlansByIdentity, searchPlan } from "@/lib/service/plan/fetch";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { WorkPlanSelector } from "./work-plan-selector";
import { searchSteps } from "@/lib/service/step/fetch";
import { headers as dynamic } from "next/headers";

interface PageProps {
  params: {
    team_identity: string;
  };
  searchParams: {
    q: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // if (searchParams.q) {
  //   const { data: plans } = await searchPlan({
  //     client: supabase,
  //     q: searchParams.q,
  //     team_identity: params.team_identity,
  //   });
  //   return <WorkPlanSelector data={plans} searchParams={searchParams} />;
  // }

  const { data: plans } = await getPlansByIdentity({
    team_identity: params.team_identity,
    db: supabase,
  });

  return <WorkPlanSelector data={plans} searchParams={searchParams} />;
}

// export default async function Page({ searchParams, params }: pageProps) {
//   dynamic();

//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   const { data: steps } = await searchSteps({
//     client: supabase,
//     q: searchParams.q,
//     team_identity: params.team_identity,
//   });

//   return (
//     <SearchStep
//       plan_id={params.plan_id}
//       steps={steps || []}
//       searchParams={searchParams}
//     />
//   );
// }
