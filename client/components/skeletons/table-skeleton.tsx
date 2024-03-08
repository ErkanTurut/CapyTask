import { Skeleton } from "@/ui/skeleton";

import { FC } from "react";

const TableSkeleton: FC = ({}) => {
  return (
    <Skeleton className="grid h-min grid-cols-8 gap-4 border bg-card p-6 ">
      <Skeleton className="col-span-2 h-7" />
      <Skeleton className="col-start-7 h-7" />
      <Skeleton className="h-7" />
      <Skeleton className="col-span-full h-9" />
      {(() => {
        const rows = [];
        for (let i = 0; i < 16; i++) {
          rows.push(<Skeleton key={i} className="col-span-2 h-4" />);
        }
        return rows;
      })()}

      <Skeleton className="col-span-full h-9" />
    </Skeleton>
  );
};

export default TableSkeleton;
