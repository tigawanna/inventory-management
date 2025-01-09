import { Suspense } from "react";
import { OneTeamDetails } from "./OneTeamDetails";

interface OneTeamPageProps {}

export function OneTeamPage({}: OneTeamPageProps) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <Suspense
        fallback={
          <div className="flex h-full min-h-screen w-full items-center justify-center">
            <div className="skeleton flex h-56 w-[70%] items-center justify-center bg-base-300 text-2xl md:w-[60%]">
              Loading
            </div>
          </div>
        }
      >
        <OneTeamDetails />
      </Suspense>
    </div>
  );
}
