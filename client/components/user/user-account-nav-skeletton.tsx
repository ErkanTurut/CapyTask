import { Skeleton } from "@/ui/skeleton";

import { FC } from "react";
import { buttonVariants } from "@/ui/button";
import { cn } from "@/lib/utils";

interface UserAccountNavSkeletonProps {}

const UserAccountNavSkeleton: FC<UserAccountNavSkeletonProps> = ({}) => {
  return <Skeleton className={"flex h-9 w-full items-center justify-center"} />;
};

export default UserAccountNavSkeleton;
