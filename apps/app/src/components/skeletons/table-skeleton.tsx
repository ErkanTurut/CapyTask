import { Skeleton } from "@gembuddy/ui/skeleton";

import { FC } from "react";

const TableSkeleton: FC = ({}) => {
  return (
    <Skeleton className="grid grid-cols-8 gap-4 bg-card">
      <Skeleton className="col-span-2 h-7" />
      <Skeleton className="col-start-7 h-7" />
      <Skeleton className="h-7" />

      <Skeleton className="col-span-full h-9" />
      {(() => {
        const rows = [];
        for (let i = 0; i < 12; i++) {
          rows.push(<Skeleton key={i} className="col-span-2 h-4" />);
        }
        return rows;
      })()}

      <Skeleton className="col-span-full h-9" />
    </Skeleton>
  );
};

export default TableSkeleton;
