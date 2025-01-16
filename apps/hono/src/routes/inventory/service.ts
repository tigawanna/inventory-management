import { z } from "zod";

import { and, ilike } from "drizzle-orm";
import { inventoryTable } from "@/db/schema/inventory";
import { BaseCrudService } from "@/services/base-crud-service";
import {
  inventoryInsertSchema,
  inventoryUpdateSchema,
  listInventoryQueryParamsSchema,
} from "./schema";

export class InventoryService extends BaseCrudService<
  typeof inventoryTable,
  z.infer<typeof inventoryInsertSchema>,
  z.infer<typeof inventoryUpdateSchema>
> {
  constructor() {
    super(inventoryTable);
  }

  // Override or add custom methods
  async findAll(query: z.infer<typeof listInventoryQueryParamsSchema>) {
    const { search, categoryId, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(inventoryTable.name, `%${search}%`) : undefined,
      categoryId ? ilike(inventoryTable.categoryId, `%${categoryId}`) : undefined
    );

    return super.findAll(paginationQuery, conditions);
  }
}
