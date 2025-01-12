import { db } from "@/db/client.ts";
import { auditLogsTable } from "@/db/schema/users.ts";
import { eq, and, desc, ilike } from "drizzle-orm";
import { BaseCrudService } from "./generic-crud-service.ts";
import type { z } from "zod";
import type {
  auditLogInsertSchema,
  auditLogUpdateSchema,
  listAuditLogQueryParamsSchema,
} from "@/schemas/audit-log-service.ts";
import { type Request } from "express";
export enum AuditAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  PASSWORD_RESET = "PASSWORD_RESET",
  EMAIL_VERIFY = "EMAIL_VERIFY",
}

export enum EntityType {
  USER = "USER",
  INVENTORY = "INVENTORY",
  CATEGORY = "CATEGORY",
}

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
    super(auditLogsTable, EntityType.INVENTORY);
  }
  async findAll(query: z.infer<typeof listAuditLogQueryParamsSchema>) {
    const { search, ...paginationQuery } = query;
    const conditions = and(
      search ? ilike(auditLogsTable.entityType, `%${search}%`) : undefined,
    );

    return super.findAll(paginationQuery, conditions);
  }

  // async create(data: AuditLogData) {
  //   return db.insert(auditLogsTable).values(data).returning();
  // }

  async findByEntity(entityType: EntityType, entityId: string) {
    return db
      .select()
      .from(auditLogsTable)
      .where(
        and(
          eq(auditLogsTable.entityType, entityType),
          eq(auditLogsTable.entityId, entityId),
        ),
      )
      .orderBy(desc(auditLogsTable.created_at));
  }

  async findByUser(userId: string) {
    return db
      .select()
      .from(auditLogsTable)
      .where(eq(auditLogsTable.userId, userId))
      .orderBy(desc(auditLogsTable.created_at));
  }

  async createChangeLog(
    {
      userId,
      entityType,
      entityId,
      oldData,
      newData,
      ipAddress,
    }: Omit<AuditLogData, "action">,
    req: Request,
  ) {
    return this.create(
      {
        userId,
        action: AuditAction.UPDATE,
        entityType,
        entityId,
        oldData,
        newData,
        ipAddress,
      },
      req,
    );
  }

  async logLogin(userId: string, req: Request) {
    const ipAddress = req.headers?.["x-forwarded-for"]?.[0] ?? "";
    return this.create({
      userId,
      action: AuditAction.LOGIN,
      entityType: EntityType.USER,
      entityId: userId,
      ipAddress,
    }, req);
  }

  async logLogout(userId: string, req: Request) {
    const ipAddress = req.headers?.["x-forwarded-for"]?.[0] ?? "";
    return this.create(
      {
        userId,
        action: AuditAction.LOGOUT,
        entityType: EntityType.USER,
        entityId: userId,
        ipAddress,
      },
      req,
    );
  }
}
