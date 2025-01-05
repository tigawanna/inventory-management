import { createRootRouteWithContext } from "@tanstack/react-router";
import "@/view-transition/angled-transition.css";
import "@/view-transition/wipe-transition.css";
import "@/view-transition/slides-transition.css";
import "@/view-transition/flip-transition.css";
import "@/view-transition/vertical-transition.css";
import "../components/pagination/pagination.css";
import "daisyui-devtools/style.css"
import "./styles.css";
import { QueryClient } from "@tanstack/react-query";
import { PocketbaseViewerType } from "@/lib/tanstack/query/use-viewer";
import { RootComponent } from "./-components/RootComponent";
import { z } from "zod";

const searchparams = z.object({
  globalPage: z.number().optional(),
  globalSearch: z.string().optional(),
});

// const list = createRouteMask({

// })


export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  viewer?: PocketbaseViewerType;
}>()({
  component: RootComponent,
  validateSearch: (search) => searchparams.parse(search),

});
