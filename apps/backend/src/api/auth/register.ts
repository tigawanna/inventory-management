import { validate } from "@/middleware/auth.ts";
import type { AuthService } from "@/services/auth-service.ts";
import type { Router } from "express";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});
export function registerUserRoute(router: Router, authService: AuthService) {
  router.post("/register", validate(registerSchema), async (req, res) => {
    await authService.register(req.body);
    return res
      .header("Content-Type", "application/json")
      .status(201)
      .json({ message: "Registration successful" });
  });
  return router;
}
