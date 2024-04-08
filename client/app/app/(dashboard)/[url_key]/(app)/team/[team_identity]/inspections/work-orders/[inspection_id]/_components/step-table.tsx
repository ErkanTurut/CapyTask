"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/trpc/server";

interface PageProps {
  steps: NonNullable<
    Awaited<ReturnType<typeof trpc.db.inspection.get.withSteps.query>>["data"]
  >["step"];
}

export default function StepTable({ steps }: PageProps) {
  //   console.log(steps[0].step_template_snapshot);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead className="table-cell">Title</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Last update</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {
            steps.map((step) => {
              return (
                <TableRow key={step.id}>
                  <TableCell className=" ">{step.}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="font-medium">{step.title}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {step.description}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {step.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{step.updated_at}</TableCell>
                </TableRow>
              );
            })
        } */}

        <TableRow>
          <TableCell className=" ">1</TableCell>
          <TableCell className="table-cell">
            <div className="font-medium">Liam Johnson</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
          <TableCell className="table-cell">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
