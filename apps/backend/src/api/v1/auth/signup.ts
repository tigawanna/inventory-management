import express from "express";
import { z } from "zod";
import { AuthService } from "@/services/auth-service.ts";

const router = express.Router();
const authService = new AuthService();
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/", async (req, res) => {
  const { success, data, error } = registerSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invalid fields",
      error: error.flatten(),
    });
  }
  try {
    const createdUser = await authService.register(data);
    res.status(201);
    res.json({
      message: "user created",
      data: createdUser,
    });
  } catch (err: any) {
    res.status(400);
    res.json({
      message: "user creation failed",
      error: err?.message,
    });
  }
});

export default router;
