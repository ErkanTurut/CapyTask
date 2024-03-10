"use client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./routes/_app";

export const trpc = createTRPCReact<AppRouter>({});
