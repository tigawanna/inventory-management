import type { Context } from "hono";

import { and, desc, eq } from "drizzle-orm";
import { getContext } from "hono/context-storage";

import type { AppBindings } from "@/lib/types";

import { db } from "@/db/client";
import { auditLogsTable } from "@/db/schema/users";

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
  private ctx: Context<AppBindings, any, {}>;

  constructor() {
    this.ctx = getContext<AppBindings>();
  }
  getIpAddress() {
    return this.ctx.env.incoming.socket?.remoteAddress;
  }
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
    );
  }

  async logLogin(userId: string) {
    const ipAddress = this.getIpAddress()
    return this.create(
      {
        userId,
        action: auditAction.LOGIN,
        entityType: entityType.USER,
        entityId: userId,
        ipAddress,
      },
    );
  }

  async logLogout(userId: string) {
       const ipAddress = this.getIpAddress()
    return this.create(
      {
        userId,
        action: auditAction.LOGOUT,
        entityType: entityType.USER,
        entityId: userId,
        ipAddress,
      },
    );
  }
}
