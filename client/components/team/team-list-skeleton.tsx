import { Skeleton } from "@/ui/skeleton";

import { FC } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface TeamListSkeletonProps {}

const TeamListSkeleton: FC<TeamListSkeletonProps> = ({}) => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "h-6 w-full",
          )}
        />
      ))}
    </>
  );
};

export default TeamListSkeleton;
