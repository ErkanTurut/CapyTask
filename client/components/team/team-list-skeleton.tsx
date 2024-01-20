import { Skeleton } from "@/ui/skeleton";

import { FC } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface TeamListSkeletonProps {}

const TeamListSkeleton: FC<TeamListSkeletonProps> = ({}) => {
  return (
    <>
      <Skeleton
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "w-full",
        )}
      />
      <Skeleton
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "w-full",
        )}
      />
      <Skeleton
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "w-full",
        )}
      />
    </>
  );
};

export default TeamListSkeleton;
