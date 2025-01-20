import { makeHotToast } from "@/components/toasters";
import { getCurrentUser, InventoryUser, logoutUser } from "@/lib/api/users";
import { CookieManager } from "@/utils/browser";
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
  record: {
    id: string;
    name: string;
    email: string;
    username: string;
    role: "user" | "admin";
  };
  token: string;
};

export function viewerqueryOptions() {
  return {
    queryKey: ["viewer"],
    queryFn: async () => {
      const currentUserResponse = await getCurrentUser();
      console.log(currentUserResponse);
      return currentUserResponse;
    },
    staleTime: 12 * 60 * 1000,
  };
}

export function useViewer() {
  const qc = useQueryClient();
  // const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: async () => {
      qc.invalidateQueries(viewerqueryOptions());
      return new Promise<{ result: { message: string }; error: null }>((res) =>
        setTimeout(() => {
          CookieManager.clearAccessAndRefreshTokens();
          res({
            result: {
              message: "success",
            },
            error: null,
          });
        }, 3000),
      );
      // document.cookie = "";
      // return await logoutUser();
      // navigate({ to: "/auth", search: { returnTo: "/" } });
    },
    onSuccess: (data) => {
      makeHotToast({
        title: "signed out",
        description: "",
        variant: "success",
        duration: 2000,
      });
      qc.invalidateQueries(viewerqueryOptions());
      // navigate({ to: "/auth", search: { returnTo: "/" } });
    },
    onError(error) {
      const errorMessage = error as { message: string };
      makeHotToast({
        title: "Something went wrong",
        description: `${errorMessage?.message}`,
        variant: "error",
        duration: 10000,
      });
    },
  });
  const viewerQuery = useSuspenseQuery(viewerqueryOptions());
  const viewer = viewerQuery.data?.record;

  return {
    viewerQuery,
    viewer,
    role: viewer?.role,
    logoutMutation,
  } as const;
}

export type PocketbaseViewerType =
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
