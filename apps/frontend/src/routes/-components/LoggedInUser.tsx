import { InventoryUser } from "@/lib/api/users";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useNavigate } from "@tanstack/react-router";
import { UserCheck } from "lucide-react";
interface LoggedInUserProps {
  viewer: InventoryUser | null;
}

export function LoggedInUser({ viewer }: LoggedInUserProps) {
  const { logoutMutation } = useViewer();
  const tsrNavigate = useNavigate({
    from: "/",
  });
  if (!viewer) return null;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full justify-evenly gap-2">
        <h1 className="text-2xl">{viewer.name}</h1>
        <h2 className="">{viewer.email}</h2>
      </div>
      <div className="flex w-full justify-evenly gap-2">
        {viewer.role === "admin" && <UserCheck className="text-success" />}
        <button
          className="btn btn-wide"
          onClick={() => {
            logoutMutation.mutate();
            tsrNavigate({ to: "/auth", search: { returnTo: "/" } });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
