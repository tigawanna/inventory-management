import { Home, ShieldCheck, Store, Users, Wallet } from "lucide-react";

export const dashboard_routes = [
  { name: "inventory", href: "/dashboard/inventory", icon: <Users /> },
  { name: "categories", href: "/dashboard/categories", icon: <Wallet /> },
  { name: "auditlogs", href: "/dashboard/auditlogs", icon: <Wallet /> },
  {
    name: "team",
    href: "/dashboard/users",
    icon: (
      <div className="flex">
        <Users />
        <ShieldCheck />
      </div>
    ),
  },
] as const;

export const routes = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
    children: undefined,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Store />,
    children: dashboard_routes,
  },
  // {
  //   name: "Profile",
  //   href: "/profile",
  //   icon: <User />,
  //   children: undefined,
  // },
] as const;
