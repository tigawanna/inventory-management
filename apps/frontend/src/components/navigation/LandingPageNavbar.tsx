import { Link, useRouterState } from "@tanstack/react-router";
import Nprogress from "./nprogress/Nprogress";

interface LandingPageNavbarProps {}

export function LandingPageNavbar({}: LandingPageNavbarProps) {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  return (
    <header className="sticky top-0 z-30 flex  w-full flex-col items-center justify-between bg-base-200">
      <nav className="flex h-full w-full items-center justify-between gap-5 px-2 pr-5">
        <img src="/syt.png" alt="logo" className="h-12" />
      </nav>
      <Nprogress isAnimating={isLoading} />
    </header>
  );
}
//  home,about us , resurces, comunitty, contact us , products , blog,shop
const landingPageRoutes= [

  { name: "home", href: "/" },
  { name: "about us", href: "/about-us" },
  { name: "resources", href: "/resources" },
  { name: "colabs", href: "/dashboard" },
  { name: "products", href: "/products" },
  { name: "blog", href: "/blog" },
  { name: "shop", href: "/shop" },
]
