import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { categoryTable } from "@/db/schema/inventory.ts";
import { z } from "zod";

export const categorySelectSchema = createSelectSchema(categoryTable);
export const categoryInsertSchema = createInsertSchema(categoryTable);
export const categoryUpdateSchema = createUpdateSchema(categoryTable);

export type CategoryItem = z.infer<typeof categorySelectSchema>;
export type UpdateCategoryFields = z.infer<typeof categoryUpdateSchema>;
export type CreateCategoryFields = z.infer<typeof categoryInsertSchema>;
export type ViewcategoryParams = z.infer<typeof viewcategoryParamsSchema>;
export type ListCategoryQueryParams = z.infer<
  typeof listcategoryQueryParamsSchema
>;



const sortBy = ["name", "description", "created_at"] as const satisfies Array<
  keyof CategoryItem
>;
export const listcategoryQueryParamsSchema = z.object({
  page: z.string().default("1"),
  limit: z.string().default("10"),
  sort: z.enum(sortBy).optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
});

export const viewcategoryParamsSchema = z.object({
  id: z.string(),
});
