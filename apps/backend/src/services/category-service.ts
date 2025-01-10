import type { z } from "zod";
import { BaseCrudService } from "./generic-crud-service.ts";
import { categoryTable } from "@/db/schema/inventory.ts";
import type {
  categoryUpdateSchema,
  categoryInsertSchema,
  listcategoryQueryParamsSchema,
} from "@/schemas/category-schema.ts";
import { EntityType } from "./audit-log.service.ts";
import { and, eq, ilike } from "drizzle-orm";

export class CategoryService extends BaseCrudService<
  typeof categoryTable,
  z.infer<typeof categoryInsertSchema>,
  z.infer<typeof categoryUpdateSchema>
> {
  constructor() {
    super(categoryTable, EntityType.INVENTORY);
  }

  // Override or add custom methods
  async findAll(query: z.infer<typeof listcategoryQueryParamsSchema>) {
    const { search,...paginationQuery } = query;

    const conditions = and(
      //   eq(categoryTable.isActive, true),
      search ? ilike(categoryTable.name, `%${search}%`) : undefined,
      //   categoryId ? eq(categoryTable.categoryId, categoryId) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
