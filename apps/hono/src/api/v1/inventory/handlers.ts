import type { AppRouteHandler } from "@/lib/types";

import type { ListRoute } from "./routes";

import { InventoryService } from "./service";

const userService = new InventoryService();
export const list: AppRouteHandler<ListRoute> = async (c) => {
  const inventory = await userService.findAll(c.req.valid("query"));
  return c.json(inventory);
};
