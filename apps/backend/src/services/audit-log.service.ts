import { db } from "@/db/client.ts";
import { auditLogsTable } from "@/db/schema/users.ts";
import { eq,and,desc } from "drizzle-orm";
import type { Request } from "express";

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

export class AuditLogService {
  async create(data: AuditLogData, req: Request) {
    return db.insert(auditLogsTable).values(data).returning();
  }

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
        action: auditAction.UPDATE,
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
    const ipAddress = req.clientIp ?? "";
    return this.create(
      {
        userId,
        action: auditAction.LOGIN,
        entityType: entityType.USER,
        entityId: userId,
        ipAddress,
      },
      req,
    );
  }

  async logLogout(userId: string, req: Request) {
    const ipAddress = req.clientIp ?? "";
    return this.create(
      {
        userId,
        action: auditAction.LOGOUT,
        entityType: entityType.USER,
        entityId: userId,
        ipAddress,
      },
      req,
    );
  }
}
