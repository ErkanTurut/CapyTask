"use client";
import type { Metadata } from "next";
import AccountForm from "@/components/forms/settings-forms/account-settings";
import { cookies } from "next/headers";
import type { user } from "@prisma/client";
import { Suspense } from "react";

import { PostgrestError } from "@supabase/supabase-js";
import { Shell } from "@/components/shells/shell";

export default async function Error({ error }: { error: Error }) {
  return <h1>something went wring :c</h1>;
}
