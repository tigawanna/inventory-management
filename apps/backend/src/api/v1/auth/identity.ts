import { authenticate } from "@/middleware/auth.ts";
import type { AuthService } from "@/services/auth-service.ts";
import type { Router } from "express";
import { z } from "zod";


export function verifyUserTokenRoute(router: Router, authService: AuthService) {
const verifyQuerySchema = z.object({
  token: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

router.post("/verify-email", async (req, res) => {
  const { success, data, error } = verifyQuerySchema.safeParse(req.query);
  if (!success) {
    return res.status(400).json({
      message: "invalid fields",
      error: error.flatten(),
    });
  }
  try {
    const verifiedUser = await authService.verifyEmail(data.token, data.email);
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
  return router;
}

export function meRoute(router: Router, authService: AuthService) {
  router.get("/me", authenticate, async (req, res) => {
    const user = await authService.getUser(req.user.id);
    res.json(user);
  });
}
