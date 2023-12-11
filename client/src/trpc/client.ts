import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/trpc/server/routers";

export const trpc = createTRPCReact<AppRouter>({});
