import type { AuthService } from "@/services/auth-service.ts";
import { parseZodError } from "@/utils/zod-errors.ts";
import type { Router } from "express";
import { z } from "zod";


export function registerUserRoute(router: Router, authService: AuthService) {
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signup", async (req, res) => {
  const { success, data, error } = registerSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invalid fields",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  try {
    const createdUser = await authService.register(data,req);
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
  return router;
}
