import type { z } from "zod";

import { and, asc, desc, getTableColumns, ilike, sql } from "drizzle-orm";

import { db } from "@/db/client";
import { usersTable } from "@/db/schema/users";
import { entityType } from "@/services/audit-log.service";
import { BaseCrudService } from "@/services/base-crud-service";

import type {
  listUsersQueryParamsSchema,
  usersInsertSchema,
  usersUpdateSchema,
} from "./users.schema";

export class UsersService extends BaseCrudService<
  typeof usersTable,
  z.infer<typeof usersInsertSchema>,
  z.infer<typeof usersUpdateSchema>
> {
  constructor() {
    super(usersTable, entityType.INVENTORY);
  }

  // Override or add custom methods
  //  @ts-expect-error it's fine justa  simple override
  override async findAll(query: z.infer<typeof listUsersQueryParamsSchema>) {
    const { password, refreshToken, refreshTokenVersion, verificationToken, ...rest } = getTableColumns(usersTable);
    const { search, ..._ } = query;
    const conditions = and(
      search ? ilike(usersTable.name, `%${search}%`) : undefined,
    );

    const { page, limit, sort, order } = query;

    // Get total count
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(this.table)
      .where(conditions);

    // Build query
    const dbQuery = db
      .select({...rest })
      .from(this.table)
      .where(conditions)
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));

    // Add sorting
    if (sort) {
      dbQuery.orderBy(
        order === "desc" ? desc(this.table[sort]) : asc(this.table[sort]),
      );
    }

    const items = await dbQuery;

    return {
      page: Number(page),
      perPage: Number(limit),
      totalItems: Number(count),
      totalPages: Math.ceil(Number(count) / Number(limit)),
      items,
    };
  }
}
