interface PlanPageProps {
  params: {
    team_identity: string;
    plan_id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PlanPage({ params }: PlanPageProps) {
  return <div> {params.plan_id} </div>;
}
