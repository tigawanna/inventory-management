import type { z } from "zod";
import { BaseCrudService } from "./generic-crud-service.ts";
import { inventoryTable } from "@/db/schema/inventory.ts";
import type {
  inventoryInsertSchema,
  inventoryUpdateSchema,
  listInventoryQueryParamsSchema,
} from "@/schemas/inventory-schema.ts";
import { entityType } from "./audit-log.service.ts";
import { and,  ilike } from "drizzle-orm";

export class InventoryService extends BaseCrudService<
  typeof inventoryTable,
  z.infer<typeof inventoryInsertSchema>,
  z.infer<typeof inventoryUpdateSchema>
> {
  constructor() {
    super(inventoryTable, entityType.INVENTORY);
  }

  // Override or add custom methods
  async findAll(query: z.infer<typeof listInventoryQueryParamsSchema>) {
    const { search, categoryId, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(inventoryTable.name, `%${search}%`) : undefined,
      categoryId ? ilike(inventoryTable.categoryId, `%${categoryId}`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
