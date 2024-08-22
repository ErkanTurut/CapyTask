import { Icons } from "@/components/icons";

interface loadingProps {}
export default async function Loading({}: loadingProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-muted-foreground">
        Loading...
      </h1>
      <Icons.loading className="h-4 w-4 animate-spin" />
    </div>
  );
}
