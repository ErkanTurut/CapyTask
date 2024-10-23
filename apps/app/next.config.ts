import "./src/env.mjs";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  transpilePackages: ["@gembuddy/supabase"],
  experimental: {
    instrumentationHook: process.env.NODE_ENV === "production",
    ppr: "incremental",
  },
};

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  telemetry: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: "/monitoring",
});
