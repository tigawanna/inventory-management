import { authenticate, authenticateAdminOnly } from "@/middleware/auth.ts";
import {
auditLogInsertSchema,
  auditLogUpdateSchema,
  auditLogSelectSchema,
  listAuditLogQueryParamsSchema,
  viewAuditLogParamsSchema
} from "@/schemas/audit-log-service.ts";
import { AuditLogService } from "@/services/audit-log.service.ts";
import { InventoryService } from "@/services/inventory-service.ts";
import { parseZodError } from "@/utils/zod-errors.ts";
import express from "express";

const router = express.Router();
const auditlogService = new AuditLogService()
//  list
router.get("/", authenticate, async (req, res) => {
  const { success, data, error } = listAuditLogQueryParamsSchema.safeParse(
    req.query,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid fields",
      error: parseZodError(error),
    });
  }
  const response = await auditlogService.findAll(data);
  res.status(200);
  return res.json(response);
});
// view
router.get("/:id", authenticate, async (req, res) => {
  const item = await auditlogService.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.status(200);
  return res.json(item);
});
// create
router.post("/", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = auditLogInsertSchema.safeParse(req.body);
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid fields",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  try {
    const item = await auditlogService.create(data, req);
    res.status(201).json(item);
  } catch (error) {
    res.status(400);
    if (error instanceof Error) {
      return res.json({
        message: "inventory creation failed",
        error: error?.message,
        data: error?.message,
      });
    }
    return res.json({ message: "inventory creation failed", error });
  }
});
// update
router.put("/:id", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = viewAuditLogParamsSchema.safeParse(
    req.params,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid param",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  const body = auditLogInsertSchema.safeParse(req.body);
  if (!body.success || !body.data) {
    return res.status(400).json({
      message: "invalid fields",
      error: body.error?.flatten(),
    });
  }
  const item = await auditlogService.update(data.id, body.data, req);
  if (!item) return res.status(404).json({ message: "Item not found" });
  return res.json(item);
});
// delete
router.delete("/:id", authenticateAdminOnly, async (req, res) => {
  const { success, data, error } = viewAuditLogParamsSchema.safeParse(
    req.params,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid param",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  const item = await auditlogService.delete(data.id, req);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  return res.json({ message: "Item deleted successfully" });
});

export default router;
