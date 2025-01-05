import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { useViewer } from "./lib/tanstack/query/use-viewer";
import { queryClient, router } from "./main";

export function App() {
    useEffect(() => {
      document.documentElement.dataset.style = "vertical";
      themeChange(false);
    }, []);
    const { viewerQuery } = useViewer();
  
    return (
      <>
        <RouterProvider
          router={router}
          defaultPreload="intent"
          context={{
            queryClient,
            viewer: viewerQuery?.data,
          }}
        />
      </>
    );
  }
