import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { inventoryTable, categoryTable } from "@/db/schema/inventory.ts";
import { z } from "zod";


export const inventorySelectSchema = createSelectSchema(inventoryTable);
export const inventoryInsertSchema = createInsertSchema(inventoryTable);
export const inventoryUpdateSchema = createUpdateSchema(inventoryTable);

export const listInventoryQueryParamsSchema = z.object({
  page: z.string().default('1'),
  limit: z.string().default('10'),
  sort: z.enum(["name", "price", "quantity"]).optional(),
  order: z.enum(["asc", "desc"]).default("asc"),
  search: z.string().optional(),
  categoryId: z.string().optional(),
});

export const viewInventoryParamsSchema = z.object({
    id:z.string()
})

export type listInventoryQueryParams = z.infer<typeof listInventoryQueryParamsSchema>
export type listInventory = z.infer<typeof inventorySelectSchema>;
export type updateInventory = z.infer<typeof inventoryUpdateSchema>
export type createInventory = z.infer<typeof inventoryInsertSchema>
export type viewInventoryParams = z.infer<typeof viewInventoryParamsSchema>



export const categorySelectSchema = createSelectSchema(categoryTable);
export const categoryInsertSchema = createInsertSchema(categoryTable);
export const categoryUpdateSchema = createUpdateSchema(categoryTable);
