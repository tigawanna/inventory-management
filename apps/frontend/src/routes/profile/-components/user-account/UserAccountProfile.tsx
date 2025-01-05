import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { PropertyUserResponse } from "@/lib/pb/pb-types";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { getFileURL } from "@/lib/pb/client";
import { UserAccountProfileForm } from "./UserAccountProfileForm";
import { Mail, Phone } from "lucide-react";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";

interface UserAccountProfileProps {}

export function UserAccountProfile({}: UserAccountProfileProps) {
  const { viewer, logoutMutation } = useViewer();
  const user = viewer!;
  const [input, setInput] = useState<
    PropertyUserResponse & { avatarUrl: string }
  >({
    ...user,
    avatarUrl: getFileURL({
      collection_id_or_name: "property_user",
      fallback: "/avatar.png",
      record_id: user?.id,
      file_name: user?.avatar,
    }),
  });
  const tsrNavigate = useNavigate();
  if (!input) {
    return <Navigate to="/auth" search={{ returnTo: "/profile" }} />;
  }
  return (
    <Card className="flex h-full w-[90%] flex-col items-center border border-base-200 bg-base-300 shadow shadow-base-300 md:w-fit md:flex-row">
      <CardHeader className="flex flex-row items-center p-0"></CardHeader>
      <CardContent className="rounded-lg p-0">
        <div className="flex h-full w-full flex-col gap-3 md:flex-row">
          <img
            src={input.avatarUrl}
            className="aspect-square size-full object-cover md:h-[350px]"
          />
          <div className="flex flex-col justify-between gap-1 p-5">
            <div className="p2- flex flex-col gap-1">
              {input.username && (
                <div className="i flex h-full gap-2">
                  <CardTitle className="text-5xl">{input.username}</CardTitle>
                  {input.staff && (
                    <Badge>
                      {input.username?.charAt(0).toUpperCase() +
                        input.username?.slice(1)}
                    </Badge>
                  )}
                </div>
              )}
              {input.email && (
                <span className="flex items-center gap-1">
                  <Mail className="size-4" />
                  {input.email}
                </span>
              )}
              {input.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="size-4" />:{input.phone}
                </span>
              )}
            </div>
            <div className="] flex w-full flex-col items-center justify-center gap-1">
              <UserAccountProfileForm input={input} setInput={setInput} />
              <MutationButton
                className="btn-error max-w-[98%]"
                onClick={() => {
                  logoutMutation.mutate();
                  tsrNavigate({
                    to: "/auth",
                    search: { returnTo: "/" },
                  });
                }}
                label="Logout"
                mutation={logoutMutation}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
