import { validate } from "@/middleware/auth.ts";
import type { AuthService } from "@/services/auth-service.ts";
import type { Router } from "express";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export function loginUserRoute(router: Router, authService: AuthService) {
  router.post("/login", validate(loginSchema), async (req, res) => {
    const { success, data, error } = loginSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error });
    }
    if (!data) {
      return res.status(400).json({ error });
    }
    const { email, password } = data;
    const { token, user } = await authService.login(email, password);
    res.json({ token, user });
  });
  return router;
}
