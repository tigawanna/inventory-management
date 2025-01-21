import type { z } from "zod";

import { auditLogsTable } from "@/db/schema/auditlogs";
import { and, asc, desc, eq, ilike, sql } from "drizzle-orm";

import { db } from "@/db/client";

import type {
  listAuditlogsQueryParamsSchema,
} from "./auditlogs.schema";

export class AuditlogsService {
  constructor() {}

  async findAll(query: z.infer<typeof listAuditlogsQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(auditLogsTable.entityType, `%${search}%`) : undefined,
    );

    const { page, limit, sort, order } = paginationQuery;

    // Get total count
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(auditLogsTable)
      .where(conditions);

    // Build query
    const dbQuery = db
      .select()
      .from(auditLogsTable)
      .where(conditions)
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));

    // Add sorting
    if (sort) {
      dbQuery.orderBy(
        order === "desc" ? desc(auditLogsTable[sort]) : asc(auditLogsTable[sort]),
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

  async findById(id: string) {
    const auditLog = await db
      .select()
      .from(auditLogsTable)
      .where(eq(auditLogsTable.id, id))
      .limit(1);
    return auditLog;
  }
}
