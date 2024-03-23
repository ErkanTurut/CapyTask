import * as z from "zod";
import { StatusSchema } from "./enum.schema";
import { ZCreateTeamSchema } from "../team/create.schema";
import { ZCreateInspectionSchema } from "../template/inspection/create.schema";
import { ZCreateStepSchema } from "../template/step/create.schema";

export const ZCreateWorkOrderSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    status: z.lazy(() => StatusSchema).optional(),
    team: z.lazy(() => ZCreateTeamSchema),
    inspection_snapshot: z.lazy(() => ZCreateInspectionSchema).optional(),
    step: z.lazy(() => ZCreateStepSchema).optional(),
  })
  .strict();

export type TCreateWorkOrderSchema = z.infer<typeof ZCreateWorkOrderSchema>;
