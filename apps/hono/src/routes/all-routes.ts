import index from "@/routes/index.route";
import inventory from "@/routes/inventory/index";
export const allroutes = [
  //  start of routes
  index,
  inventory,
  // end of routes
] as const;
