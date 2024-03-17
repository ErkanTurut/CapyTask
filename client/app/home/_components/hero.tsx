"use client";
import { Icons } from "@/components/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
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
        <PageHeaderHeading className="text-center" size={"lg"}>
          Unlock Efficiency with buddy
        </PageHeaderHeading>
        <PageHeaderDescription className="mx-auto text-center" size={"lg"}>
          Simplify preventive maintenance and inspections with our intuitive
          platform. Collaborate seamlessly, create customized Inspection Plans,
          and execute inspections with precision. Experience efficiency like
          never before.
        </PageHeaderDescription>
      </PageHeader>
      <div className=" flex items-center justify-center gap-6">
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
