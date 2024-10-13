import { Skeleton } from "@gembuddy/ui/skeleton";

import { FC } from "react";

interface CardSkeletonProps {}

const CardSkeleton: FC<CardSkeletonProps> = ({}) => {
  return (
    <Skeleton className="grid h-min gap-4 border bg-card p-6">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/2" />

      <Skeleton className="mt-4 h-4 w-1/4" />
      <Skeleton className="h-7 " />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-7 " />
    </Skeleton>
  );
};

export default CardSkeleton;
