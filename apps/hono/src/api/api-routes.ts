import index from "@/api/index.route";
import mainroutes from "@/api/main.route";

export const allroutes = [
  //  start of routes
  index,
 mainroutes
  // end of routes
] as const;
