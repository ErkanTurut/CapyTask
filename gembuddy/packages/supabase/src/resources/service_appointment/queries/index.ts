import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";

export async function getServiceAppointmentById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("service_appointment")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function getServiceAppointmentByWorkOrder({
  db,
  input,
}: {
  db: Client;
  input: {
    work_order_id: string;
  };
}) {
  const { data } = await db
    .from("service_appointment")
    .select()
    .eq("work_order_id", input.work_order_id)
    .throwOnError();

  return { data };
}

export async function getServiceAppointmentByServiceResources({
  db,
  input,
}: {
  db: Client;
  input: {
    service_resources_id: string[];
    date_range: {
      from: string | undefined;
      to: string | undefined;
    };
  };
}) {
  const { data } = await db
    .from("service_appointment")
    .select()
    .in("assigned_resource.service_resource_id", input.service_resources_id)
    .gte("start_date", input.date_range.from)
    .lte("end_date", input.date_range.to)
    .throwOnError();

  return { data };
}
