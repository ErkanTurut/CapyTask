import "server-only";

import { unstable_cache as cache } from "next/cache";
import { SupabaseClient } from "@/lib/supabase/server";
import { sleep } from "@/lib/utils";
import { TCreateServiceAppointmentSchema } from "./create.schema";

export const createServiceAppointmentHandler = async ({
  input,
  db,
}: {
  input: TCreateServiceAppointmentSchema;
  db: SupabaseClient;
}) => {
  const { data, error } = await db
    .from("service_appointment")
    .insert({
      work_order_id: input.work_order_id,
      team_id: input.team_id,
      workspace_id: input.workspace_id,
      start_date: input.start_date,
      end_date: input.end_date,
      work_order_item_id: input.work_order_item_id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  if (input.assigned_resource) {
    const assigned_resources = input.assigned_resource.map((resource) => ({
      service_appointment_id: data.id,
      service_resource_id: resource,
    }));
    await db.from("assigned_resource").upsert(assigned_resources, {
      onConflict: "service_appointment_id,service_resource_id",
    });
  }

  return data;
};
