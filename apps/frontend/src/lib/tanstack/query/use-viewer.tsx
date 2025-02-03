import { makeHotToast } from "@/components/toasters";
import { authService, GetApiAuthMe200 } from "@/lib/kubb/gen";

import {
  QueryClient,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { error } from "console";

type InventoryUser = GetApiAuthMe200["result"];
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
      const currentUserResponse = await authService().getApiAuthMeClient();
      if (currentUserResponse.type === "error")
        return { result: null, error: "No user" };
      return {
        result: currentUserResponse.data.result,
        error: null,
      };
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
      return await authService().postApiAuthSignoutClient();
    },
    onSuccess: (data) => {
      if (data.type === "error") {
        return makeHotToast({
          title: "signed out",
          description: "",
          variant: "success",
          duration: 2000,
        });
        qc.invalidateQueries(viewerqueryOptions());
        // navigate({ to: "/auth", search: { returnTo: "/" } });
      }
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
  const viewer = viewerQuery.data;

  return {
    viewerQuery,
    viewer,
    role: viewer?.result?.role,
    logoutMutation,
  } as const;
}
