import { db } from "@/db/client.ts";
import { inventoryTable } from "@/db/schema/inventory.ts";
import type { MessageResponse } from "@/interfaces/Responses.ts";
import { authenticateAdminOnly, validate } from "@/middleware/auth.ts";
import {
  inventoryInsertSchema,
  listInventoryQueryParamsSchema,
  viewInventoryParamsSchema,
} from "@/schemas/inventory-schema.ts";
import { and, asc, desc, eq, like } from "drizzle-orm";
import express from "express";


const router = express.Router();

router.get("/", async (req, res) => {
  const { success, data, error } = listInventoryQueryParamsSchema.safeParse(
    req.query,
  );
  if (!data || !success) {
    return res.status(400).json({
      message: "invalid fields",
      error: error?.flatten(),
    });
  }
  const { page, limit, sort, order, search, categoryId } = data;
  const query = db
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
    query.orderBy(
      order === "desc" ? desc(inventoryTable[sort]) : asc(inventoryTable[sort]),
    );
  }

  const items = await query;
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await db
    .select()
    .from(inventoryTable)
    .where(
      and(
        eq(inventoryTable.id, req.params.id),
        eq(inventoryTable.isActive, true),
      ),
    )
    .limit(1);

  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

router.post("/", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = inventoryInsertSchema.safeParse(req.body);
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid fields",
      error: error?.flatten(),
    });
  }

  const item = await db.insert(inventoryTable).values(data).returning();
  res.status(201).json(item[0]);
});

router.put("/:id", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = viewInventoryParamsSchema.safeParse(
    req.params,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid param",
      error: error?.flatten(),
    });
  }
  const item = await db
    .update(inventoryTable)
    .set(req.body)
    .where(eq(inventoryTable.id, data.id))
    .returning();

  if (!item.length) return res.status(404).json({ message: "Item not found" });
  res.json(item[0]);
});

router.delete("/:id", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = viewInventoryParamsSchema.safeParse(
    req.params,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid param",
      error: error?.flatten(),
    });
  }
  const item = await db
    .update(inventoryTable)
    .set({ isActive: false })
    .where(eq(inventoryTable.id, data.id))
    .returning();

  if (!item.length) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted successfully" });
});

export default router;
