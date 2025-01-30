import { InventoryUser } from "@/lib/api/users";
import { QueryClient } from "@tanstack/react-query";
import { AnyContext, BeforeLoadContextOptions, redirect, RootRoute } from "@tanstack/react-router";

export type ViewerType =
  | {
      record: null;
      error: any;
    }
  | {
      record: InventoryUser;
      error: null;
    };


type AuthBeforeloadContext = BeforeLoadContextOptions<
  RootRoute<
    undefined,
    {
      queryClient: QueryClient;
      viewer?: ViewerType;
    },
    AnyContext,
    AnyContext,
    {},
    undefined,
    unknown,
    unknown
  >,
  any,
  Record<never, string>,
  AnyContext,
  AnyContext
>;

interface AuthGuardProps {
  ctx: AuthBeforeloadContext;
  role?: "admin" | "user";
  reverse?: boolean;
}

export async function authGuard({ ctx, role, reverse }: AuthGuardProps) {
  const returnTo = ctx.search?.returnTo ?? "/";
  const user = ctx.context?.viewer;
  if (!user?.record) {
    throw redirect({
      to: "/auth",
      search: {
        returnTo: ctx.location.pathname,
      },
    });
  }
  if (!(role && user?.record && user?.record?.role !== role)) {
    throw redirect({
      to: "..",
      search: {
        returnTo: ctx.location.pathname,
      },
    });
  }

  if (reverse) {
    throw redirect({
      to: returnTo ?? "/",
    });
  }
}
