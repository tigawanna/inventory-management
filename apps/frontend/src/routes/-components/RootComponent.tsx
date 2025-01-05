import { TailwindIndicator } from "@/components/navigation/tailwind-indicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

export function RootComponent() {
  return (
    <div className="content min-h-screen w-full">
      <TailwindIndicator />
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      {/* <TanStackRouterDevtools position="bottom-left" /> */}
      {/* <DaisyUIDevtools
        drawaerTriggerClassName="fixed bottom-[5%] right-[45%] z-20"
        drawerZIndex="z-50"
      /> */}
      <Toaster reverseOrder />
    </div>
  );
}
