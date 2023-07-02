import { FC } from "react";
import { Icons } from "../icons";
import Link from "next/link";
import UserAuthForm from "./userAuthForm";

interface signInProps {}

const signIn: FC<signInProps> = ({}) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo size="m" color="dark" className="mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Capy account and agree to Capy's{" "}
          <a href="#" className="text-blue-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>
          .
        </p>

        {/* sign in form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to Capy ?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-3"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default signIn;
