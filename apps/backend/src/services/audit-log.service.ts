import { db } from "@/db/client.ts";
import { auditLogsTable } from "@/db/schema/users.ts";
import { eq,and,desc } from "drizzle-orm";

export enum AuditAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  PASSWORD_RESET = "PASSWORD_RESET",
  EMAIL_VERIFY = "EMAIL_VERIFY"
}

export enum EntityType {
  USER = "USER",
  INVENTORY = "INVENTORY",
  CATEGORY = "CATEGORY"
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

export class AuditLogService {
  async create(data: AuditLogData) {
    return db.insert(auditLogsTable).values(data).returning();
  }

  async findByEntity(entityType: EntityType, entityId: string) {
    return db
      .select()
      .from(auditLogsTable)
      .where(
        and(
          eq(auditLogsTable.entityType, entityType),
          eq(auditLogsTable.entityId, entityId)
        )
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

  async createChangeLog({
    userId,
    entityType,
    entityId,
    oldData,
    newData,
    ipAddress
  }: Omit<AuditLogData, "action">) {
    return this.create({
      userId,
      action: AuditAction.UPDATE,
      entityType,
      entityId,
      oldData,
      newData,
      ipAddress
    });
  }

  async logLogin(userId: string, ipAddress?: string) {
    return this.create({
      userId,
      action: AuditAction.LOGIN,
      entityType: EntityType.USER,
      entityId: userId,
      ipAddress
    });
  }

  async logLogout(userId: string, ipAddress?: string) {
    return this.create({
      userId,
      action: AuditAction.LOGOUT, 
      entityType: EntityType.USER,
      entityId: userId,
      ipAddress
    });
  }
}
