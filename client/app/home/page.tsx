import { Shell } from "@/components/shells";
import Hero from "./_components/hero";

export default async function Home() {
  return (
    <Shell variant="markdown" className="max-w-5xl">
      <Hero />
    </Shell>
  );
}
