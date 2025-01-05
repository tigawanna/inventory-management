import { UserAccountProfile } from "./user-account/UserAccountProfile";
import { Suspense } from "react";

interface ProfilePageProps {}

export function ProfilePage({}: ProfilePageProps) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center p-1">
      <Suspense>
        <div className="flex h-full min-h-screen w-full flex-col items-center justify-center p-1">
          <UserAccountProfile />
        </div>
      </Suspense>
    </div>
  );
}
