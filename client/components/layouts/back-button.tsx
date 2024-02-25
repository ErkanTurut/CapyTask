"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { Icons } from "@/components/icons";

interface backButtonProps {}

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
