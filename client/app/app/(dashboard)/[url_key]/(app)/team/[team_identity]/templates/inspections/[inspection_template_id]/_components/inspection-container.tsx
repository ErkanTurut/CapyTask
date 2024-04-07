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
import { notFound } from "next/navigation";
interface StepsContainerProps {
  params: {
    url_key: string;
    team_identity: string;
    inspection_template_id: string;
  };
}
const InspectionContainer: React.FC<StepsContainerProps> = async ({
  params,
}) => {
  const { data: inspection_template } =
    await trpc.db.template.inspection.get.withSteps.query({
      id: params.inspection_template_id,
    });

  if (!inspection_template) {
    return notFound();
  }

  return (
    <Card className="sticky top-4 h-min">
      <CardHeader className="pb-4">
        <CardTitle>{inspection_template.name}</CardTitle>
        <CardDescription>List of steps for the inspection plan</CardDescription>
        <div className="flex gap-2">
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
            <span>Search a step...</span>
            <span className="sr-only">Search steps</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "default", size: "icon" }),
              "shrink-0 gap-2",
            )}
            href={{
              pathname: `/${params.url_key}/team/${params.team_identity}/templates/inspections/${params.inspection_template_id}/create`,
            }}
          >
            <Icons.plusCircled className="h-4 w-4 " aria-hidden="true" />

            <span className="sr-only">Create</span>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <StepList
          initialData={inspection_template.step_template || []}
          inspection_template_id={params.inspection_template_id}
        />
      </CardContent>
    </Card>
  );
};

export default InspectionContainer;
