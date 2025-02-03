import { GetApiAuthMe200 } from "@/lib/kubb/gen";
import { QueryClient } from "@tanstack/react-query";
import { AnyContext, BeforeLoadContextOptions, redirect, RootRoute } from "@tanstack/react-router";


type InventoryUser= GetApiAuthMe200["result"]

export type ViewerType =
  | {
      result: null;
      error: any;
    }
  | {
      result: InventoryUser;
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
  console.log("user === ", user);
  // if (!user?.result) {
  //   throw redirect({
  //     to: "/auth",
  //     search: {
  //       returnTo: ctx.location.pathname,
  //     },
  //   });
  // }
  // if (!(role && user?.result && user?.result?.role !== role)) {
  //   throw redirect({
  //     to: "..",
  //     search: {
  //       returnTo: ctx.location.pathname,
  //     },
  //   });
  // }

  if (reverse) {
    throw redirect({
      to: returnTo ?? "/",
    });
  }
}
