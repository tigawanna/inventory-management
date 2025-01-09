import { Outlet } from "@tanstack/react-router";
import { MessageCircleWarningIcon } from "lucide-react";

interface UnderDevelopmentLayoutProps {}

export function UnderDevelopmentLayout({}: UnderDevelopmentLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full gap-5 p-5 text-lg">
        <MessageCircleWarningIcon /> These sections are Under active development
      </div>
      <Outlet />
    </div>
  );
}
