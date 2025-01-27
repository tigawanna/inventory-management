import type { z } from "zod";

import { and, asc, desc, eq, ilike, like, sql } from "drizzle-orm";

import { db } from "@/db/client";
import { auditLogsTable } from "@/db/schema/auditlogs";

import type {
  listAuditlogsQueryParamsSchema,
} from "./auditlogs.schema";

export class AuditlogsService {
  constructor() {}

  async findAll(query: z.infer<typeof listAuditlogsQueryParamsSchema>) {
    const { search, action, entity, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(auditLogsTable.entityType, `%${search}%`) : undefined,
      entity ? eq(auditLogsTable.entityType, entity) : undefined,
      action ? eq(auditLogsTable.action, action) : undefined,
    );

    const { page, limit, sort, order } = paginationQuery;

    // Get total count
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(auditLogsTable)
      .where(conditions);

    const dbQuery = db.query.auditLogsTable.findMany({
      where: conditions,
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      orderBy: sort && (order === "desc" ? desc(auditLogsTable[sort]) : asc(auditLogsTable[sort])),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    });
    // Build query
    // const dbSelect = db
    //   .select()
    //   .from(auditLogsTable)
    //   .leftJoin(usersTable, eq(auditLogsTable.userId, usersTable.id))
    //   .where(conditions)
    //   .limit(Number(limit))
    //   .offset((Number(page) - 1) * Number(limit));

    // Add sorting
    // if (sort) {
    //   dbQuery.orderBy(
    //     order === "desc" ? desc(auditLogsTable[sort]) : asc(auditLogsTable[sort]),
    //   );
    // }

    const items = await dbQuery;

    return {
      page: Number(page),
      perPage: Number(limit),
      totalItems: Number(count),
      totalPages: Math.ceil(Number(count) / Number(limit)),
      items,
    };
  }

  async findById(id: string) {
    // const auditLogQuery = await db
    //   .select()
    //   .from(auditLogsTable)
    //   .where(eq(auditLogsTable.id, id))
    //   .limit(1);
    //   return auditLogQuery?.[0];
    const auditLogSelect = await db.query.auditLogsTable.findFirst({
      where: eq(auditLogsTable.id, id),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    });
    return auditLogSelect;
  }
}
