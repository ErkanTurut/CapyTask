"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/client";

interface testButtonProps {
  range: { from: string; to: string };
}

export default function TestButton({ range }: testButtonProps) {
  const { data, refetch, isFetching } =
    api.db.service_appointment.test.useQuery({
      scheduled_range: [range.from, range.to],
    });

  console.log(data);

  return (
    <Button onClick={() => refetch()} isLoading={isFetching}>
      TEST
    </Button>
  );
}
