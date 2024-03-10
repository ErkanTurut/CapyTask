import { trpc } from "@/trpc/server";
import { WorkPlanSelector } from "./work-plan-selector";

interface PageProps {
  params: {
    team_identity: string;
  };
  searchParams: {
    q: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { data: plans } = await trpc.db.plan.getPlansByIdentity.query({
    team_identity: params.team_identity,
    range: {
      start: 0,
      end: 10,
    },
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
