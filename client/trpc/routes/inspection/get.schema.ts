import * as z from "zod";
import { StatusSchema } from "./enum.schema";

import { ZCreateStepSchema } from "../template/step/create.schema";

export const ZGetInspcetionSchema = z
  .object({
    team_identity: z
      .string({
        invalid_type_error: "Indentity must be a string",
        required_error: "Indentity is required",
      })
      .min(3, { message: "Indentity must be at least 3 characters long" })
      .max(5, { message: "Slug must be less than 5 characters long" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "Slug must be lowercase and contain no spaces",
      }),
    range: z.object({
      start: z.number().int().nonnegative(),
      end: z.number().int().positive(),
    }),
  })
  .strict();

export type TGetInspcetionSchema = z.infer<typeof ZGetInspcetionSchema>;
