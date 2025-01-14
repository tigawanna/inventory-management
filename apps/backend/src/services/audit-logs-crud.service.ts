import { auditLogsTable } from "@/db/schema/users.ts";
import { and, ilike } from "drizzle-orm";

import type { z } from "zod";
import type {
  auditLogInsertSchema,
  auditLogUpdateSchema,
  listAuditLogQueryParamsSchema,
} from "@/schemas/audit-log-service.ts";
import { BaseCrudService } from "./generic-crud-service.ts";
export const auditAction = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  PASSWORD_RESET: "PASSWORD_RESET",
  EMAIL_VERIFY: "EMAIL_VERIFY",
} as const;
export type AuditAction = keyof typeof auditAction;
export const entityType = {
  USER: "USER",
  INVENTORY: "INVENTORY",
  CATEGORY: "CATEGORY",
} as const;
export type EntityType = keyof typeof entityType;
interface AuditLogData {
  userId: string;
  action: AuditAction;
  entityType: EntityType;
  entityId: string;
  oldData?: Record<string, any>;
  newData?: Record<string, any>;
  ipAddress?: string;
}

export class AuditLogService extends BaseCrudService<
  typeof auditLogsTable,
  z.infer<typeof auditLogInsertSchema>,
  z.infer<typeof auditLogUpdateSchema>
> {
  constructor() {
    super(auditLogsTable, entityType.INVENTORY);
  }
  async findAll(query: z.infer<typeof listAuditLogQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(auditLogsTable.entityType, `%${search}%`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }
}
