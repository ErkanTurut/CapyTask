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
        <CardDescription className="text-pretty line-clamp-4  leading-relaxed">
          {work_order.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex w-full items-stretch  pb-2">
        <div className="flex flex-col gap-0.5 rounded-md p-2 text-center">
          <span className="text-pretty text-xs text-muted-foreground">
            Status :
          </span>
          <StatusButton status={work_order.status} />
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="flex flex-col gap-0.5 rounded-md p-2  text-center">
          <span className="text-pretty text-xs text-muted-foreground ">
            Work plan :
          </span>
          <Button variant={"link"} size={"sm"}>
            {work_order.work_plan_id}
          </Button>
        </div>
        <Separator orientation="vertical" className="h-auto" />
        <div className="text-pretty flex flex-col gap-0.5  rounded-md p-2 text-center ">
          <span className="text-xs text-muted-foreground">Asset :</span>
          <Button variant={"link"} size={"sm"}>
            {work_order.work_plan_id}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
