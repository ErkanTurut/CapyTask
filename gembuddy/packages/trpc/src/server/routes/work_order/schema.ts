import z from "zod";

export const ZCreateWorkOrderSchema = z.object({
  company_id: z.string(),
  created_at: z.string().optional(),
  description: z.string().nullable().optional(),
  ended_at: z.string().nullable().optional(),
  id: z.string().optional(),
  location_id: z.string().nullable().optional(),
  name: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  public_id: z.string().optional(),
  requested_by_id: z.string().nullable().optional(),
  sheduled_end: z.string().nullable().optional(),
  sheduled_start: z.string().nullable().optional(),
  source: z
    .enum([
      "MAINTENANCE_PLAN",
      "AI_CHAT",
      "AI_VOICE_ASSISTANT",
      "MANUAL_ENTRY",
      "OTHER",
    ])
    .nullable()
    .optional(),
  started_at: z.string().nullable().optional(),
  status: z
    .enum(["OPEN", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELED"])
    .optional(),
  team_id: z.string(),
  type: z.enum(["INSPECTION", "MAINTENANCE", "OTHER"]).optional(),
  updated_at: z.string().optional(),
  work_plan_id: z.string().nullable().optional(),
  workspace_id: z.string(),
});

export type TCreateWorkOrderSchema = z.infer<typeof ZCreateWorkOrderSchema>;

export const ZUpdateWorkOrderSchema = z
  .object({
    company_id: z.string().optional(),
    created_at: z.string().optional(),
    description: z.string().nullable().optional(),
    ended_at: z.string().nullable().optional(),
    id: z.string().optional(),
    location_id: z.string().nullable().optional(),
    name: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    public_id: z.string().optional(),
    requested_by_id: z.string().nullable().optional(),
    sheduled_end: z.string().nullable().optional(),
    sheduled_start: z.string().nullable().optional(),
    source: z
      .enum([
        "MAINTENANCE_PLAN",
        "AI_CHAT",
        "AI_VOICE_ASSISTANT",
        "MANUAL_ENTRY",
        "OTHER",
      ])
      .nullable()
      .optional(),
    started_at: z.string().nullable().optional(),
    status: z
      .enum(["OPEN", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELED"])
      .optional(),
    team_id: z.string().optional(),
    type: z.enum(["INSPECTION", "MAINTENANCE", "OTHER"]).optional(),
    updated_at: z.string().optional(),
    work_plan_id: z.string().nullable().optional(),
    workspace_id: z.string().optional(),
  })
  .merge(
    z.object({
      work_order_id: z.string(),
    })
  );

export type TUpdateWorkOrderSchema = z.infer<typeof ZUpdateWorkOrderSchema>;

export const ZGetWorkOrderByIdSchema = z.object({
  id: z.string(),
});

export type TGetWorkOrderByIdSchema = z.infer<typeof ZGetWorkOrderByIdSchema>;

/*
    team_identity: string;
        range: {
            from: number;
            to: number;
        };
*/
export const ZGetWorkOrderByTeamSchema = z.object({
  team_identity: z.string(),
  range: z.object({
    from: z.number(),
    to: z.number(),
  }),
});

export type TGetWorkOrderByTeamSchema = z.infer<
  typeof ZGetWorkOrderByTeamSchema
>;

export const ZSearchWorkOrderSchema = z.object({
  search: z.string(),
  range: z.object({
    from: z.number(),
    to: z.number(),
  }),
  team_identity: z.string(),
});

export type TSearchWorkOrderSchema = z.infer<typeof ZSearchWorkOrderSchema>;

export const ZDeleteWorkOrderManySchema = z.object({
  work_order_id: z.string().array(),
});
