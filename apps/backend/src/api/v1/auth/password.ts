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
    const { success, data, error } = z.object({ email: z.string().email() }).safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "invalid fields",
        error: error.flatten(),
      });
    }
    await authService.requestReset(data.email);
    res.json({ message: "Password reset instructions sent" });
  });
}
export function resetPasswordRoute(router: Router, authService: AuthService) {
  router.post("/reset-password", validate(resetPasswordSchema), async (req, res) => {
 const { success, data, error } = resetPasswordSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "invalid fields",
        error: error.flatten(),
      });
    }
    await authService.resetPassword(data.token, data.password);
    res.json({ message: "Password reset successful" });
  });
}
