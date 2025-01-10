import { authenticate, authenticateAdminOnly } from "@/middleware/auth.ts";
import {
  listcategoryQueryParamsSchema,
  categoryInsertSchema,
  categoryUpdateSchema,
  viewcategoryParamsSchema,
} from "@/schemas/category-schema.ts";
import { CategoryService } from "@/services/category-service.ts";

import { parseZodError } from "@/utils/zod-errors.ts";
import express from "express";

const router = express.Router();
const categoryService = new CategoryService();
//  list
router.get("/", authenticate, async (req, res) => {
  const { success, data, error } = listcategoryQueryParamsSchema.safeParse(
    req.query,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid fields",
      error: parseZodError(error),
    });
  }
  const response = await categoryService.findAll(data);
  res.status(200);
  return res.json(response);
});
// view
router.get("/:id", authenticate, async (req, res) => {
  const item = await categoryService.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.status(200);
  return res.json(item);
});
// create
router.post("/", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = categoryInsertSchema.safeParse(req.body);
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid fields",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  try {
    const item = await categoryService.create(data, req);
    res.status(201).json(item);
  } catch (error) {
    res.status(400);
    if (error instanceof Error) {
      return res.json({
        message: "category creation failed",
        error: error?.message,
        data: error?.message,
      });
    }
    return res.json({ message: "category creation failed", error });
  }
});
// update
router.put("/:id", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = viewcategoryParamsSchema.safeParse(
    req.params,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid param",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  const body = categoryUpdateSchema.safeParse(req.body);
  if (!body.success || !body.data) {
    return res.status(400).json({
      message: "invalid fields",
      error: body.error?.flatten(),
    });
  }
  const item = await categoryService.update(data.id, body.data, req);
  if (!item) return res.status(404).json({ message: "Item not found" });
  return res.json(item);
});
// delete
router.delete("/:id", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = viewcategoryParamsSchema.safeParse(
    req.params,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid param",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  const item = await categoryService.delete(data.id, req);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json({ message: "Item deleted successfully" });
});

export default router;
