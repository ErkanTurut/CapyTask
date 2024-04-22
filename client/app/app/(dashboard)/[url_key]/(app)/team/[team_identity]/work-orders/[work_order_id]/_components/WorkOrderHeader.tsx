import { Icons } from "@/components/icons";
import { StatusButton } from "@/components/statusButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Label } from "@/components/ui/label";

interface WorkOrderHeaderProps {
  params: {
    work_order_id: string;
  };
}

export default async function WorkOrderHeader({
  params,
}: WorkOrderHeaderProps) {
  const { data: work_order } = await trpc.db.work_order.get.byId.query({
    id: params.work_order_id,
  });
  if (!work_order) {
    return notFound();
  }
  return (
    <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>{work_order.name}</CardTitle>
        <CardDescription className="line-clamp-4 text-pretty  leading-relaxed">
          {work_order.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex w-full items-stretch  pb-2">
        <div className="flex flex-col gap-0.5 rounded-md p-2 text-center">
          <Label
            className="text-pretty text-xs text-muted-foreground "
            htmlFor="status"
          >
            Status :
          </Label>
          <StatusButton id="status" status={work_order.status} />
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex flex-col gap-0.5 rounded-md p-2  text-center">
          <Label
            className="text-pretty text-xs text-muted-foreground "
            htmlFor="work_plan"
          >
            Work plan :
          </Label>
          <Button id="work_plan" variant={"link"} size={"sm"}>
            {work_order.work_plan_id}
          </Button>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex flex-col gap-0.5 text-pretty  rounded-md p-2 text-center ">
          <Label
            className="text-pretty text-xs text-muted-foreground "
            htmlFor="status"
            id="asset"
          >
            Asset :
          </Label>
          <Button id="asset" variant={"link"} size={"sm"}>
            {work_order.work_plan_id}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
