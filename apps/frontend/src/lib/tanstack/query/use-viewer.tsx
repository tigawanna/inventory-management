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
      return await logoutUser();

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


