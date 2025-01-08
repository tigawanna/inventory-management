import { apiQuery } from "@/lib/api/client";
import { InventoryUser } from "@/lib/api/users";
import {
  QueryClient,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  AnyContext,
  BeforeLoadContextOptions,
  Navigate,
  redirect,
  RootRoute,
  Route,
  useNavigate,
} from "@tanstack/react-router";

export type ViewerType = {
  record:{
    id: string;
    name: string;
    email: string;
    username: string;
    role:"user"|"admin";
  };
  token: string;
};

export function viewerqueryOptions() {
  return {
    queryKey: ["viewer"],
    queryFn: async () => {
      return new Promise<ViewerType>((res, rej) => {
        setTimeout(() => {
          res({
            record: { 
                id: "id_1",
                name: "name_1",
                email: "email1@email.com",
                username: "username_1",
                role: "user",
             },
            token: "token_1",
          });
        }, 1000);
      });
    },
  };
}


export function useViewer() {
  const qc = useQueryClient();
  // const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: async () => {;
      qc.invalidateQueries(viewerqueryOptions());
      // navigate({ to: "/auth", search: { returnTo: "/" } });
    },
  });
  const viewerQuery = useSuspenseQuery(
    apiQuery.queryOptions("get", "/api/v1/auth/me", {
      
    },{
      select(data) {
        return data as InventoryUser;
      },
    }),
  );
  const viewer = viewerQuery.data as InventoryUser;
  return {
    viewerQuery,
    viewer,
    role:viewer?.role,
    logoutMutation,
  } as const;
}

export type PocketbaseViewerType = ViewerType | { record: null; token: null };


type BeforeLoadCTX = BeforeLoadContextOptions<
    Route<
      RootRoute<
        undefined,
        {
          queryClient: QueryClient;
          viewer?: PocketbaseViewerType;
        },
        AnyContext,
        AnyContext,
        {},
        undefined,
        unknown,
        unknown
      >,
      "/profile",
      "/profile",
      "/profile",
      "/profile",
      undefined,
      Record<never, string>,
      AnyContext,
      AnyContext,
      AnyContext,
      {},
      undefined,
      unknown
    >,
    (search: Record<string, unknown>) => {
      returnTo?: string | undefined;
    },
    Record<never, string>,
    AnyContext,
    AnyContext
  >;


type AuthBeforeloadContext = BeforeLoadContextOptions<
  RootRoute<
    undefined,
    {
      queryClient: QueryClient;
      viewer?: PocketbaseViewerType;
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
/**
 * Beforeload hook that checks if the user is authenticated and
 * redirects to /auth if not. If the user is authenticated, it
 * checks if the user has the required role and redirects to ".."
 * if not. If the user has the required role, it does nothing.
 *
 * If the `reverse` prop is true, the behavior is reversed.
 *
 * @param ctx - The BeforeLoadContextOptions object
 * @param role - The role to check
 * @param reverse - If true, the behavior is reversed
 */
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
  if (!(role && user?.record && user?.record?.role !== role)
  ) {
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
