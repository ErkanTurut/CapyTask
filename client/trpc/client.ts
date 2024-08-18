import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./server/routes/_app";
export type { RouterInput, RouterOutput } from "./server/trpc";

export const api = createTRPCReact<AppRouter>();
