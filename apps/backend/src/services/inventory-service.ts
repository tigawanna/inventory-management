
import { and, eq, like, desc, asc } from "drizzle-orm";
import { z } from "zod";
import type { InventorySchema, QuerySchema } from "@/api/v1/inventory";
import { db } from "@/db/client.ts";
import { inventoryTable } from "@/db/schema/inventory.ts";

export class InventoryService {
  async findAll(query: z.infer<typeof QuerySchema>) {
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

  async create(data: z.infer<typeof InventorySchema>) {
    const item = await db.insert(inventoryTable).values(data).returning();

    return item[0];
  }

  async update(id: string, data: Partial<z.infer<typeof InventorySchema>>) {
    const item = await db
      .update(inventoryTable)
      .set(data)
      .where(eq(inventoryTable.id, id))
      .returning();

    return item[0];
  }

  async delete(id: string) {
    const item = await db
      .update(inventoryTable)
      .set({ isActive: false })
      .where(eq(inventoryTable.id, id))
      .returning();

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
