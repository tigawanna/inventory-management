import { and, eq, like, desc, asc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client.ts";
import { inventoryTable } from "@/db/schema/inventory.ts";
import type {
  inventoryInsertSchema,
  inventoryUpdateSchema,
  listInventoryQueryParamsSchema,
} from "@/schemas/inventory-schema.ts";
import {
  AuditAction,
  AuditLogService,
  EntityType,
} from "./audit-log.service.ts";
import { type Request } from "express";
export class InventoryService {
  private auditLogService: AuditLogService;

  constructor() {
    this.auditLogService = new AuditLogService();
  }
  async findAll(query: z.infer<typeof listInventoryQueryParamsSchema>) {
    const { page, limit, sort, order, search, categoryId } = query;

    const dbQuery = db
      .select()
      .from(inventoryTable)
      .where(
        and(
          eq(inventoryTable.isActive, true),
          search ? like(inventoryTable.name, `%${search}%`) : undefined,
          categoryId ? eq(inventoryTable.categoryId, categoryId) : undefined,
        ),
      )
      .limit(limit)
      .offset((page - 1) * limit);

    if (sort) {
      dbQuery.orderBy(
        order === "desc"
          ? desc(inventoryTable[sort])
          : asc(inventoryTable[sort]),
      );
    }

    return dbQuery;
  }

  async findById(id: string) {
    const item = await db
      .select()
      .from(inventoryTable)
      .where(and(eq(inventoryTable.id, id), eq(inventoryTable.isActive, true)))
      .limit(1);

    return item[0];
  }

  async create(data: z.infer<typeof inventoryInsertSchema>, req: Request) {
    const item = await db.insert(inventoryTable).values(data).returning();
    await this.auditLogService.create({
      userId: req.user.id,
      action: AuditAction.CREATE,
      entityType: EntityType.INVENTORY,
      entityId: item[0].id,
      newData: data,
      ipAddress: req.headers?.["x-forwarded-for"]?.[0] ?? "",
    });
    return item[0];
  }

  async update(
    id: string,
    data: Partial<z.infer<typeof inventoryUpdateSchema>>,
    req:Request
  ) {
    const item = await db
      .update(inventoryTable)
      .set(data)
      .where(eq(inventoryTable.id, id))
      .returning();
    await this.auditLogService.createChangeLog({
      userId: req.user.id,
      entityType: EntityType.INVENTORY,
      entityId: id,
      newData: item,
      ipAddress: req.headers?.["x-forwarded-for"]?.[0] ?? "",
    });
    return item[0];
  }

  async delete(id: string, req: Request) {
    const item = await db
      .update(inventoryTable)
      .set({ isActive: false })
      .where(eq(inventoryTable.id, id))
      .returning();
    await this.auditLogService.createChangeLog({
      userId: req.user.id,
      entityType: EntityType.INVENTORY,
      entityId: id,
      newData: item,
      ipAddress: req.headers?.["x-forwarded-for"]?.[0] ?? "",
    });
    return item[0];
  }

  async checkExists(id: string) {
    const item = await db
      .select({ id: inventoryTable.id })
      .from(inventoryTable)
      .where(and(eq(inventoryTable.id, id), eq(inventoryTable.isActive, true)))
      .limit(1);

    return !!item[0];
  }
}
