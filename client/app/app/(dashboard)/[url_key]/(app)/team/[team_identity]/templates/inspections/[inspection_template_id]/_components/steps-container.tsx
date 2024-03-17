import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/server";
import Link from "next/link";
import StepList from "./steps-list";
interface StepsContainerProps {
  params: {
    url_key: string;
    team_identity: string;
    inspection_template_id: string;
  };
}
const StepsContainer: React.FC<StepsContainerProps> = async ({ params }) => {
  const steps = await trpc.db.template.step.getStepsByInspection.query({
    inspection_template_id: params.inspection_template_id,
  });

  return (
    <Card className="sticky top-4 h-min">
      <CardHeader>
        <CardTitle>Inspection Plan</CardTitle>
        <CardDescription>List of steps for the inspection plan</CardDescription>
        <Link
          className={cn(
            buttonVariants({ variant: "outline" }),
            "relative w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none ",
          )}
          href={{
            pathname: `/${params.url_key}/team/${params.team_identity}/templates/inspections/${params.inspection_template_id}/search`,
            query: { q: "" },
          }}
        >
          <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
          <span>Search or create a step...</span>
          <span className="sr-only">Search steps</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
            <span className="text-xs">Ctrl</span>K
          </kbd>
        </Link>
      </CardHeader>

      <CardContent>
        {!steps || steps.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-muted-foreground">
              No steps found for this inspection plan
            </p>
          </div>
        ) : (
          <StepList
            initialData={steps}
            inspection_template_id={params.inspection_template_id}
          />
        )}
        {/* <StepList initialData={steps} inspection_template_id={params.inspection_template_id} /> */}
      </CardContent>
    </Card>
  );
};

export default StepsContainer;
