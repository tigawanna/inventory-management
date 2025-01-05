import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";



interface ProfileLinkCardProps {
  viewer: {
    id: string;
    staff?: string;
    tenant?: string;
    pnone?: string;
    avatar: string;
    username: string;
    email: string;
  };
}

export function ProfileLinkCard({viewer}:ProfileLinkCardProps){
return (
  <Link
    to="/profile"
    data-test="homepage-section--profile-link"
    className="group flex items-center justify-center gap-2 hover:brightness-125"
  >
    {/* <Avatar>
      <AvatarImage
        height={50}
        className="size-10"
        src={avatarUrl}
        alt={viewer?.username}
      />
      <AvatarFallback>{viewer?.username?.slice(0, 2)}</AvatarFallback>
    </Avatar> */}
    <div className="flex items-center justify-center gap-10">
      <span className="text-2xl">{viewer?.username}</span>
    </div>

    <ArrowRightIcon className="size-10 group-hover:animate-ping group-hover:text-secondary" />
  </Link>
);
}
