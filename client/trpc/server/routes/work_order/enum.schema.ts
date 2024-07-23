import * as z from "zod";

export const StatusSchema = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "COMPLETED",
  "ON_HOLD",
  "CANCELED",
]);
