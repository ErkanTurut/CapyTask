import z from "zod";

/*

(property) input: {
    created_at?: string;
    id?: string;
    service_appointment_id: string;
    service_resource_id: string;
    updated_at?: string;
}
    */

export const ZCreateAssignedResourceSchema = z.object({
  service_appointment_id: z.string(),
  service_resource_id: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  id: z.string().optional(),
});

export type TCreateAssignedResourceSchema = z.infer<
  typeof ZCreateAssignedResourceSchema
>;
