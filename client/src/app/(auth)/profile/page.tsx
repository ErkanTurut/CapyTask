"use client";

import { FC } from "react";
import { SignedIn, UserProfile } from "@clerk/clerk-react";
interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return <UserProfile />;
};

export default page;
