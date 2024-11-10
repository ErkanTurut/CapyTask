"use client";
import { Button } from "@gembuddy/ui/button";
import { Icons } from "@gembuddy/ui/icons";
import { useRouter } from "next/navigation";
import type { FC } from "react";

type backButtonProps = {};

const BackButton: FC<backButtonProps> = ({}) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      size="sm"
      className="group  "
    >
      <Icons.chevronLeft className=" h-4 w-4 transition group-hover:translate-x-[-0.25rem]" />
      Go back
    </Button>
  );
};

export default BackButton;
