import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { categoryTable, inventoryTable } from "@/db/schema/inventory";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const inventorySelectSchema = createSelectSchema(inventoryTable);
export const inventoryInsertSchema = createInsertSchema(inventoryTable);
export const inventoryUpdateSchema = createUpdateSchema(inventoryTable);

export type InventoryItem = z.infer<typeof inventorySelectSchema>;
export type updateInventory = z.infer<typeof inventoryUpdateSchema>;
export type createInventory = z.infer<typeof inventoryInsertSchema>;

const sortBy = ["name", "price", "quantity"] as const satisfies Array<keyof InventoryItem>;

export const listInventoryQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
  categoryId: z.string().optional(),
});

export const viewInventoryParamsSchema = z.object({
  id: z.string(),
});

export type listInventoryQueryParams = z.infer<typeof listInventoryQueryParamsSchema>;
export type viewInventoryParams = z.infer<typeof viewInventoryParamsSchema>;

export const categorySelectSchema = createSelectSchema(categoryTable);
export const categoryInsertSchema = createInsertSchema(categoryTable);
export const categoryUpdateSchema = createUpdateSchema(categoryTable);
