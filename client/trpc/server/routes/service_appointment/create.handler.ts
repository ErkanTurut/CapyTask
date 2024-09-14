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
      start_date: input.date_range.from,
      end_date: input.date_range.to,
      work_order_item_id: input.work_order_item_id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  if (input.service_resource) {
    const service_resources = input.service_resource.map((id) => ({
      service_appointment_id: data.id,
      service_resource_id: id,
    }));
    const { data: assigned_resources, error: assigned_resources_error } =
      await db.from("assigned_resource").upsert(service_resources, {
        onConflict: "service_appointment_id,service_resource_id",
      });

    if (assigned_resources_error) {
      throw assigned_resources_error;
    }
  }

  return data;
};
