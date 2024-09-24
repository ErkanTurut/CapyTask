"use server";

import { redirect } from "next/navigation";

export async function clientRedirect(data: FormData) {
  return redirect(data.get("url") as string);
}
