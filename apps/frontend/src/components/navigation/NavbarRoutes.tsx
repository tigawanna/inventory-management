import { Link } from "@tanstack/react-router";
import { routes } from "./routes";
import { Home } from "lucide-react";

interface NavbarRoutesProps {}

export function NavbarRoutes({}: NavbarRoutesProps) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <Link to="/" className="btn btn-link btn-sm">
        <Home />
      </Link>
      <div className="flex h-full w-full items-center justify-center gap-2">

      </div>
    </div>
  );
}
