import { trpc } from "@/trpc/server";
import { redirect } from "next/navigation";

interface PageProps {}

export default async function Page({}: PageProps) {
  const { data } = await trpc.db.workspace.getByCurrentUser();
  if (!data) {
    return redirect("/create");
  }
  return redirect(`/${data[0].url_key}`);
}
