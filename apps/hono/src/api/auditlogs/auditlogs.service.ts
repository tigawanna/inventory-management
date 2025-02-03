import type { z } from "zod";

import { QueryClient } from "@tanstack/query-core";
import { and, asc, desc, eq, getTableName, ilike, like, sql } from "drizzle-orm";

import { db } from "@/db/client";
import { auditLogsTable } from "@/db/schema/auditlogs";

import type {
  listAuditlogsQueryParamsSchema,
} from "./auditlogs.schema";

export class AuditlogsService {
  private queryClient: QueryClient;
  constructor() {
    this.queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 15, // 15 minutes
        },
      },
    });
  }

  async findAll(query: z.infer<typeof listAuditlogsQueryParamsSchema>) {
    const { search, action, entity, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(auditLogsTable.entityType, `%${search}%`) : undefined,
      entity ? eq(auditLogsTable.entityType, entity) : undefined,
      action ? eq(auditLogsTable.action, action) : undefined,
    );

    const { page, limit, sort, order } = paginationQuery;
    const tableName = getTableName(auditLogsTable) as string;
    const cacheKeys = [tableName, "findAll", query, conditions];
    const tsqData = await this.queryClient.fetchQuery({
      queryKey: cacheKeys,
      queryFn: async () => {
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

        const items = await dbQuery;
        return {
          page: Number(page),
          perPage: Number(limit),
          totalItems: Number(count),
          totalPages: Math.ceil(Number(count) / Number(limit)),
          items,
        };
      },

    });
    // Get total count
    return tsqData;
  }

  async findById(id: string) {
    const tableName = getTableName(auditLogsTable) as string;
    const cacheKeys = [tableName, "findById", id];
    const tsqData = await this.queryClient.fetchQuery({
      queryKey: cacheKeys,
      queryFn: async () => {
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
      },
    });
    return tsqData;
  }
}
