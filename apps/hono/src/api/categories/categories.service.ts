import type { z } from "zod";

import { and, ilike, or } from "drizzle-orm";

import { categoriesTable } from "@/db/schema/inventory";
import { entityType } from "@/services/audit-log.service";
import { BaseCrudService } from "@/services/base-crud-service";

import type {
  categoriesInsertSchema,
  categoriesUpdateSchema,
  listCategoriesQueryParamsSchema,
} from "./categories.schema";

export class CategoriesService extends BaseCrudService<
      typeof categoriesTable,
  z.infer<typeof categoriesInsertSchema>,
  z.infer<typeof categoriesUpdateSchema>
> {
  constructor() {
    super(categoriesTable, entityType.CATEGORY);
  }

  // Override or add custom methods
  override async findAll(query: z.infer<typeof listCategoriesQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = or(
      search ? ilike(categoriesTable.name, `%${search}%`) : undefined,
      search ? ilike(categoriesTable.id, `%${search}%`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
