"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/client";

interface testButtonProps {
  range: string;
}

export default function TestButton({ range }: testButtonProps) {
  const { data, refetch, isFetching } = api.db.assigned_resource.test.useQuery({
    scheduled_range: range,
  });

  console.log(data);

  return (
    <Button onClick={() => refetch()} isLoading={isFetching}>
      TEST
    </Button>
  );
}
