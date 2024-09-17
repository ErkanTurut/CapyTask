"use client";
import { Icons } from "@/components/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { FC } from "react";
interface heroProps {}

const Hero: FC<heroProps> = ({}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-ring/10 hover:ring-ring/20">
          Introducing Gembuddy.{" "}
          <a href="#" className="font-semibold text-primary">
            <span className="absolute inset-0" aria-hidden="true" />
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <PageHeader>
        <PageHeaderHeading as="h1" className="text-center" size={"lg"}>
          You're the{" "}
          <span className="relative inline-block">
            <Crown className="absolute -top-6 left-1/2 h-8 w-8 -translate-x-1/2 rotate-12 transform text-yellow-400" />
            King
          </span>{" "}
          of the Field.
        </PageHeaderHeading>
        <PageHeaderHeading as="h2" className="mx-auto text-center" size={"sm"}>
          Let Buddy Handle the Rest
        </PageHeaderHeading>

        <PageHeaderDescription className="mx-auto pt-6 text-center" size={"sm"}>
          Streamline your field service operations with Buddy. Manage jobs,
          track time, and delight customers effortlessly.
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex items-center justify-center gap-6">
        <Button>Get Started Today</Button>
        <Button variant="outline">
          Learn more <Icons.arrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
    // <div className="flex flex-col gap-2">
    // <PageHeader>
    //   <PageHeaderHeading>Welcome</PageHeaderHeading>
    //   <PageHeaderDescription>
    //     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, eveniet
    //     facere! Quos doloremque ducimus mollitia explicabo reiciendis sunt
    //     officia aut. Laborum nihil asperiores aut reprehenderit impedit eos
    //     aliquid, culpa quos.
    //   </PageHeaderDescription>
    // </PageHeader>
    //   <div className="flex items-center gap-2">
    //     <Button>start now</Button>
    //     qslkdjqsl
    //   </div>
    // </div>
  );
};

export default Hero;
