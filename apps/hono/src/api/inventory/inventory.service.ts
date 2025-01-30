import type { z } from "zod";

import { and, ilike } from "drizzle-orm";

import { inventoryTable } from "@/db/schema/inventory";
import { entityType } from "@/services/audit-log.service";
import { BaseCrudService } from "@/services/base-crud-service";

import type {
  inventoryInsertSchema,
  inventoryUpdateSchema,
  listInventoryQueryParamsSchema,
} from "./inventory.schema";

export class InventoryService extends BaseCrudService<
  typeof inventoryTable,
  z.infer<typeof inventoryInsertSchema>,
  z.infer<typeof inventoryUpdateSchema>
> {
  constructor() {
    super(inventoryTable, entityType.INVENTORY);
  }

  // Override or add custom methods
  override async findAll(query: z.infer<typeof listInventoryQueryParamsSchema>) {
    const { search, categoryId, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(inventoryTable.name, `%${search}%`) : undefined,
      categoryId ? ilike(inventoryTable.categoryId, `%${categoryId}`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
