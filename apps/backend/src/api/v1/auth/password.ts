import { validate } from "@/middleware/auth.ts";
import type { AuthService } from "@/services/auth-service.ts";
import type { Router } from "express";
import { z } from "zod";

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
});

export function forgotPasswordRoute(router: Router, authService: AuthService) {
  router.post("/forgot-password", async (req, res) => {
    await authService.requestReset(req.body.email);
    res.json({ message: "Password reset instructions sent" });
  });
}
export function resetPasswordRoute(router: Router, authService: AuthService) {
  router.post("/reset-password", validate(resetPasswordSchema), async (req, res) => {
    await authService.resetPassword(req.body.token, req.body.password);
    res.json({ message: "Password reset successful" });
  });
}
