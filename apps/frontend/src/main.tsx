import ReactDOM from "react-dom/client";
import { createRouter } from "@tanstack/react-router";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import React, { Suspense } from "react";
import { RouterPendingComponent } from "./lib/tanstack/router/RouterPendingComponent";
import { RouterErrorComponent } from "./lib/tanstack/router/routerErrorComponent";
import { RouterNotFoundComponent } from "./lib/tanstack/router/RouterNotFoundComponent";
import { App } from "./App";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: async (data, __, ___, mutation) => {
      // @ts-expect-error : something returned data type of error so don't nvalidate queries yet
      if (data && data?.type === "error") {
        return;
      }
      if (Array.isArray(mutation.meta?.invalidates)) {
        mutation.meta?.invalidates.forEach((key) => {
          return queryClient.invalidateQueries({
            queryKey: [key.trim()],
          });
        });
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

// Set up a Router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultViewTransition: true,
  defaultPendingComponent: () => <RouterPendingComponent />,
  defaultNotFoundComponent: () => <RouterNotFoundComponent />,
  defaultErrorComponent: ({ error }) => <RouterErrorComponent error={error} />,
  context: {
    queryClient,
    viewer: undefined,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<RouterPendingComponent />}>
          <App />
        </Suspense>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
