import { and, eq, ilike, desc, asc, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client.ts";
import { inventoryTable } from "@/db/schema/inventory.ts";
import type {
  inventoryInsertSchema,
  inventoryUpdateSchema,
  listInventoryQueryParamsSchema,
} from "@/schemas/inventory-schema.ts";
import {
  auditAction,
  AuditLogService,
  entityType,
} from "./audit-log.service.ts";
import { type Request } from "express";
export class InventoryService {
  private auditLogService: AuditLogService;

  constructor() {
    this.auditLogService = new AuditLogService();
  }
  async findAll(query: z.infer<typeof listInventoryQueryParamsSchema>) {
    const { page, limit, sort, order, search, categoryId } = query;
    // Base conditions for both count and data query
    const conditions = and(
      // eq(inventoryTable.isActive, true),
      search ? ilike(inventoryTable.name, `%${search}%`) : undefined,
      // categoryId ? eq(inventoryTable.categoryId, categoryId) : undefined,
    );

    // Get total count
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(inventoryTable)
      .where(conditions);

    // Get paginated data
    const dbQuery = db
      .select()
      .from(inventoryTable)
      .where(conditions)
      .limit(+limit)
      .offset((+page - 1) * +limit);

    if (sort) {
      dbQuery.orderBy(
        order === "desc"
          ? desc(inventoryTable[sort])
          : asc(inventoryTable[sort]),
      );
    } else {
      dbQuery.orderBy(
        order === "desc"
          ? desc(inventoryTable["name"])
          : asc(inventoryTable["name"]),
      );
    }

    const items = await dbQuery;
    return {
      page,
      perPage: limit,
      totalItems: count,
      totalPages: Math.ceil(count / +limit),
      items,
    };
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
      action: auditAction.CREATE,
      entityType: entityType.INVENTORY,
      entityId: item[0].id,
      newData: data,
      ipAddress: req.headers?.["x-forwarded-for"]?.[0] ?? "",
    },req);
    return item[0];
  }

  async update(
    id: string,
    data: Partial<z.infer<typeof inventoryUpdateSchema>>,
    req: Request,
  ) {
    const item = await db
      .update(inventoryTable)
      .set(data)
      .where(eq(inventoryTable.id, id))
      .returning();
    await this.auditLogService.createChangeLog({
      userId: req.user.id,
      entityType: entityType.INVENTORY,
      entityId: id,
      newData: item,
      ipAddress: req.headers?.["x-forwarded-for"]?.[0] ?? "",
    },req);
    return item[0];
  }

  async delete(id: string, req: Request) {
    if (req.user.role === "admin") {
      const item = await db
        .delete(inventoryTable)
        .where(eq(inventoryTable.id, id))
        .returning();
      await this.auditLogService.createChangeLog({
        userId: req.user.id,
        entityType: entityType.INVENTORY,
        entityId: id,
        newData: item,
        ipAddress: req.headers?.["x-forwarded-for"]?.[0] ?? "",
      },req);
      return item[0];
    }
    const item = await db
      .update(inventoryTable)
      .set({ isActive: false })
      .where(eq(inventoryTable.id, id))
      .returning();
    await this.auditLogService.createChangeLog({
      userId: req.user.id,
      entityType: entityType.INVENTORY,
      entityId: id,
      newData: item,
      ipAddress: req.headers?.["x-forwarded-for"]?.[0] ?? "",
    },req);
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
