import express from "express";
import { z } from "zod";
import { AuthService } from "@/services/auth-service.ts";

const router = express.Router();
const authService = new AuthService();
const verifySchema = z.object({
  token: z.string().min(1),
});

router.post("/", async (req, res) => {
  const { success, data, error } = verifySchema.safeParse(req.params);
  if (!success) {
    return res.status(400).json({
      message: "invalid fields",
      error: error.flatten(),
    });
  }
  try {
    const verifiedUser = await authService.verifyEmail(data.token);
    res.status(201);
    res.json({
      message: "user email verified",
      data: verifiedUser,
    });
  } catch (err: any) {
    res.status(400);
    res.json({
      message: "user email verification failed",
      error: err?.message,
    });
  }
});

export default router;
