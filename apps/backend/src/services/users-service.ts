import type { z } from "zod";
import { BaseCrudService } from "./generic-crud-service.ts";
// import type {
//   inventoryInsertSchema,
//   inventoryUpdateSchema,
//   listInventoryQueryParamsSchema,
// } from "@/schemas/inventory-schema.ts";
import { EntityType } from "./audit-log.service.ts";
import { and, ilike, or } from "drizzle-orm";
import { usersTable } from "@/db/schema/users.ts";
import type {
  listUserQueryParamsSchema,
  userInsertSchema,
  userUpdateSchema,
} from "@/schemas/user-schema.ts";

export class UsersService extends BaseCrudService<
  typeof usersTable,
  z.infer<typeof userInsertSchema>,
  z.infer<typeof userUpdateSchema>
> {
  constructor() {
    super(usersTable, EntityType.INVENTORY);
  }

  // Override or add custom methods
  async findAll(query: z.infer<typeof listUserQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = and(
      search
        ? or(
            ilike(usersTable.name, `%${search}%`),
            ilike(usersTable.email, `%${search}%`),
          )
        : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
