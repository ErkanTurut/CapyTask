import { z } from "zod";

export const ZSearchCompanySchema = z.object({
  query: z.string(),
});

export interface TSearchCompanySchema
  extends z.infer<typeof ZSearchCompanySchema> {}
