"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface userAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userAuthForm: FC<userAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        Google
      </Button>
    </div>
  );
};

export default userAuthForm;
