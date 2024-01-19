import { Skeleton } from "@/ui/skeleton";

import { FC } from "react";

interface WorkspaceSkeletonProps {}

const WorkspaceSkeleton: FC<WorkspaceSkeletonProps> = ({}) => {
  return <Skeleton className="h-9 w-full px-4 py-2" />;
};

export default WorkspaceSkeleton;
