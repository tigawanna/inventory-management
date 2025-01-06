import { authenticate } from "@/middleware/auth.ts";
import type { AuthService } from "@/services/auth-service.ts";
import type { Router } from "express";


export function verifyUserTokenRoute(router: Router, authService: AuthService) {
  router.post("/verify-email/:token", async (req, res) => {
    await authService.verifyEmail(req.params.token);
    res.json({ message: "Email verified successfully" });
  });
  return router;
}

export function meRoute(router: Router, authService: AuthService) {
  router.get("/me", authenticate, async (req, res) => {
    const user = await authService.getUser(req.user.id);
    res.json(user);
  });
}
