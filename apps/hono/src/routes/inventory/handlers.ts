import { db } from "@/db/client";
import { AppRouteHandler } from "@/lib/types";
import { ListRoute } from "./routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const inventory = await db.query.inventoryTable.findMany();
  return c.json(inventory);
};
