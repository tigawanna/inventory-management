import type { AppRouteHandler } from "@/lib/types";

import { db } from "@/db/client";

import type { ListRoute } from "./routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const inventory = await db.query.inventoryTable.findMany();
  return c.json(inventory);
};
