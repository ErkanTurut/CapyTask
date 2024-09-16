import { Icons } from "@/components/icons";

interface loadingProps {}
export default async function Loading({}: loadingProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Loading...</h1>
      <Icons.loading className="h-10 w-10 animate-spin" />
    </div>
  );
}
