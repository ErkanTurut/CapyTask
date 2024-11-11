import "server-only";
import type {
  Client,
  Database,
  TablesInsert,
  TablesUpdate,
} from "../../../types";
import { findAvailableRanges } from "../../../utils";

export async function getServiceResourceById({
  db,
  input,
}: {
  db: Client;
  input: {
    id: string;
  };
}) {
  const { data } = await db
    .from("service_resource")
    .select("*")
    .eq("id", input.id)
    .single()
    .throwOnError();

  return { data };
}

export async function getServiceResourceByUserId({
  db,
  input,
}: {
  db: Client;
  input: {
    user_id: string;
  };
}) {
  const { data } = await db
    .from("service_resource")
    .select("*")
    .eq("user_id", input.user_id)
    .single()
    .throwOnError();

  return { data };
}

export async function searchServiceResource({
  db,
  input,
}: {
  db: Client;
  input: {
    search: string;
  };
}) {
  const { data } = await db
    .from("service_resource")
    .select("*, assigned_resource(service_appointment(*))")
    .textSearch("full_name", input.search.replace(/ /g, "%"), {
      type: "websearch",
    })
    .throwOnError();

  return { data };
}

export async function getRecommendation({
  db,
  input,
}: {
  db: Client;
  input: {
    team_identity: string;
    date_range: {
      from: string;
      to: string;
    };
  };
}) {
  const { data, error } = await db
    .from("service_resource")
    .select(
      "*,team!inner(identity), assigned_resource(service_appointment!inner(*))",
    )
    .eq("team.identity", input.team_identity)
    .gte(
      "assigned_resource.service_appointment.start_date",
      input.date_range.from,
    )
    .lte("assigned_resource.service_appointment.end_date", input.date_range.to);
  if (error) {
    throw error;
  }
  // return data;

  const result = data.map((resource) => {
    const appointments = resource.assigned_resource.map(
      (assigned) => assigned.service_appointment,
    );
    return {
      ...resource,
      availableRanges: findAvailableRanges({
        scheduleRange: { from: input.date_range.from, to: input.date_range.to },
        unavailableSlots: appointments.map((appointment) => ({
          from: appointment.start_date,
          to: appointment.end_date,
        })),
      }),
    };
  });

  return result;
}
