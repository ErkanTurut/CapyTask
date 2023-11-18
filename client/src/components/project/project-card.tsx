import { FC } from "react";
import { Shell } from "../shells/shell";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface projectCardProps {}

const ProjectCard: FC<projectCardProps> = ({}) => {
  // const profilePicture =
  // user?.image_uri ??
  // `https://avatar.vercel.sh/${initials}.svg?text=${initials}`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yours Per</CardTitle>
        <CardDescription>Update your account information.</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProjectCard;
