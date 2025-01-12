import { authenticate } from "@/middleware/auth.ts";
import {
    listUserQueryParamsSchema,
  userInsertSchema,
  userUpdateSchema,
  viewUserParamsSchema
} from "@/schemas/user-schema.ts";
import { UsersService } from "@/services/users-service.ts";
import { parseZodError } from "@/utils/zod-errors.ts";
import express from "express";

const router = express.Router();
router.use((...args)=>authenticate(...args,true));
const userService = new UsersService();
//  list
router.get("/", authenticate, async (req, res) => {
  const { success, data, error } = listUserQueryParamsSchema.safeParse(
    req.query,
  );
  if (!success || !data) {
    return res.status(400).json({
      message: "invalid fields",
      error: parseZodError(error),
    });
  }
  const response = await userService.findAll(data);
  res.status(200);
  return res.json(response);
});
// view
router.get("/:id", authenticate, async (req, res) => {
  const item = await userService.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.status(200);
  return res.json(item);
});
// create
router.post(
  "/",
  (...args) => authenticate(...args, true),
  async (req, res) => {
    const { success, data, error } = userInsertSchema.safeParse(req.body);
    if (!success || !data) {
      return res.status(400).json({
        message: "invalid fields",
        data: parseZodError(error),
        error: error?.flatten(),
      });
    }
    try {
      const item = await userService.create(data, req);
      res.status(201).json(item);
    } catch (error) {
      res.status(400);
      if (error instanceof Error) {
        return res.json({
          message: "users creation failed",
          error: error?.message,
          data: error?.message,
        });
      }
      return res.json({ message: "users creation failed", error });
    }
  },
);
// update
router.put(
  "/:id",
  (...args) => authenticate(...args, true),
  async (req, res) => {
    const { success, data, error } = viewUserParamsSchema.safeParse(req.params);
    if (!success || !data) {
      return res.status(400).json({
        message: "invalid param",
        data: parseZodError(error),
        error: error?.flatten(),
      });
    }
    const body = userUpdateSchema.safeParse(req.body);
    if (!body.success || !body.data) {
      return res.status(400).json({
        message: "invalid fields",
        error: body.error?.flatten(),
      });
    }
    const item = await userService.update(data.id, body.data, req);
    if (!item) return res.status(404).json({ message: "Item not found" });
    return res.json(item);
  },
);
// delete
router.delete(
  "/:id",
  (...args) => authenticate(...args, true),
  async (req, res) => {
    const { success, data, error } = viewUserParamsSchema.safeParse(req.params);
    if (!success || !data) {
      return res.status(400).json({
        message: "invalid param",
        data: parseZodError(error),
        error: error?.flatten(),
      });
    }
    const item = await userService.delete(data.id, req);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.json({ message: "Item deleted successfully" });
  },
);

export default router;
