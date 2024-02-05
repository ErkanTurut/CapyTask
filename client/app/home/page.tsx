import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells";
import { Button } from "@/components/ui/button";
import Hero from "./_components/hero";
import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { Icons } from "@/components/icons";

export default async function Home() {
  return (
    <Shell variant="markdown" className="max-w-5xl">
      <Hero />
    </Shell>
  );
}
