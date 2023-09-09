"use client";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shells/shell";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();
export default async function Home() {
  const { data, error } = await supabase.auth.getUser();
  console.log(data, error);
  return (
    <Shell as="div" className="gap-12">
      <section>Products</section>
      <Button onClick={() => console.log(data)}>Button</Button>
    </Shell>
  );
}
