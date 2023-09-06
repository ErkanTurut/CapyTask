import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shells/shell";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  return (
    <Shell as="div" className="gap-12">
      <section>Home</section>
    </Shell>
  );
}
