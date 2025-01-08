import { db } from "@/db/client.ts";
import { inventoryTable } from "@/db/schema/inventory.ts";
import { authenticate, authenticateAdminOnly } from "@/middleware/auth.ts";
import {
  inventoryInsertSchema,
  listInventoryQueryParamsSchema,
  viewInventoryParamsSchema,
} from "@/schemas/inventory-schema.ts";
import { rateLimit } from "@/services/rate-limit-service.ts";
import { and, asc, desc, eq, like } from "drizzle-orm";
import express from "express";

const router = express.Router();
//  list
router.get("/", authenticate, async (req, res) => {
  const { success, data, error } = listInventoryQueryParamsSchema.safeParse(
    req.query,
  );
  if (!data || !success) {
    return res.status(400).json({
      message: "invalid fields",
      error: error?.flatten(),
    });
  }
  const shouldRAteLimit = await rateLimit(req.user.id);
  if (shouldRAteLimit) {
    return res.status(429).json({
      message: "rate limit exceeded",
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
// view
router.get("/:id", authenticate, async (req, res) => {
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
  res.status(200);
  return res.json(item);
});
// create
router.post("/", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = inventoryInsertSchema.safeParse(req.body);
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid fields",
      error: error?.flatten(),
    });
  }
  try {
    const item = await db.insert(inventoryTable).values(data).returning();
    res.status(201).json(item[0]);
  } catch (error) {
    res.status(400);
    if (error instanceof Error) {
      return res.json({
        message: "inventory creation failed",
        error: error?.message,
      });
    }
    return res.json({ message: "inventory creation failed", error });
  }
});
// update
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
  const body = inventoryInsertSchema.safeParse(req.body);
  if (!body.success || !body.data) {
    return res.status(400).json({
      message: "invalid fields",
      error: body.error?.flatten(),
    });
  }
  const item = await db
    .update(inventoryTable)
    .set(body.data)
    .where(eq(inventoryTable.id, data.id))
    .returning();

  if (!item.length) return res.status(404).json({ message: "Item not found" });
  return res.json(item[0]);
});
// delete
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
  if (req.user.role === "admin") {
    await db
      .delete(inventoryTable)
      .where(eq(inventoryTable.id, data.id))
      .returning();
    return res.json({ message: "Item deleted successfully" });
  }
  const item = await db
    .update(inventoryTable)
    .set({ isActive: false })
    .where(eq(inventoryTable.id, data.id))
    .returning();

  if (!item.length) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json({ message: "Item deleted successfully" });
});

export default router;
