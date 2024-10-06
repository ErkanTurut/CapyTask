import "server-only";

import { SupabaseClient } from "@/lib/supabase/server";
import { TGetAssignedResourceByWorkOrderSchema } from "./get.schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const ZCreateAssignedResource = z.object({
  //   work_order_id: z.string(),
  scheduled_range: z.array(z.string().datetime()).length(2),
});

export type TCreateAssignedResource = z.infer<typeof ZCreateAssignedResource>;

export async function createAssignedResource({
  db,
  input,
}: {
  db: SupabaseClient;
  input: TCreateAssignedResource;
}) {}
