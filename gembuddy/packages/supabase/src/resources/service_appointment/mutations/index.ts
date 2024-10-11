import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function createServiceAppointment({
  db,
  input,
}: {
  input: TablesInsert<"service_appointment">;
  db: Client;
}) {
  const { data } = await db
    .from("service_appointment")
    .insert(input)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function updateServiceAppointment({
  db,
  input,
  id,
}: {
  db: Client;
  input: TablesUpdate<"service_appointment">;
  id: string;
}) {
  const { data } = await db
    .from("service_appointment")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
    .throwOnError();

  return { data };
}

export async function deleteServiceAppointments({
  db,
  input,
}: {
  db: Client;
  input: {
    service_appointment_id: string[];
  };
}) {
  const { status } = await db
    .from("service_appointment")
    .delete()
    .in("service_appointment_id", input.service_appointment_id)
    .throwOnError();

  return { status };
}
