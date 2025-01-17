import index from "@/api/v1/index.route";
import v1Routes from "@/api/v1/v1.index.route";

export const allroutes = [
  //  start of routes
  index,
 v1Routes
  // end of routes
] as const;
