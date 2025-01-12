import type { z } from "zod";
import { BaseCrudService } from "./generic-crud-service.ts";
import type {
  inventoryInsertSchema,
  inventoryUpdateSchema,
  listInventoryQueryParamsSchema,
} from "@/schemas/inventory-schema.ts";
import { EntityType } from "./audit-log.service.ts";
import { ilike, or } from "drizzle-orm";
import { usersTable } from "@/db/schema/users.ts";

export class InventoryService extends BaseCrudService<
  typeof usersTable,
  z.infer<typeof inventoryInsertSchema>,
  z.infer<typeof inventoryUpdateSchema>
> {
  constructor() {
    super(usersTable, EntityType.INVENTORY);
  }

  // Override or add custom methods
  async findAll(query: z.infer<typeof listInventoryQueryParamsSchema>) {
    const { search, categoryId, ...paginationQuery } = query;
    const conditions = or(
      search ? ilike(usersTable.name, `%${search}%`) : undefined,
      categoryId ? ilike(usersTable.email, `%${search}%`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
