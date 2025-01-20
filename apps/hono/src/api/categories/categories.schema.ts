import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { categoriesTable } from "@/db/schema/inventory";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const categoriesSelectSchema = createSelectSchema(categoriesTable);
export const categoriesInsertSchema = createInsertSchema(categoriesTable);
export const categoriesUpdateSchema = createUpdateSchema(categoriesTable);

export type CategoriesItem = z.infer<typeof categoriesSelectSchema>;
export type updateCategories = z.infer<typeof categoriesUpdateSchema>;
export type createCategories = z.infer<typeof categoriesInsertSchema>;

const sortBy = ["created_at","name"] as const satisfies Array<keyof CategoriesItem>;

export const listCategoriesQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewCategoriesParamsSchema = z.object({
  id: z.string(),
});

export type listCategoriesQueryParams = z.infer<typeof listCategoriesQueryParamsSchema>;
export type viewCategoriesParams = z.infer<typeof viewCategoriesParamsSchema>;
