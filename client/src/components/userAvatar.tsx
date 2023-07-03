import { FC } from "react";
import type { User } from "@clerk/backend";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Icons } from "./icons";

interface UserAvatarProps {
  user: Pick<User, "firstName" | "imageUrl">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar>
      {user.imageUrl ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.imageUrl}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.firstName}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
