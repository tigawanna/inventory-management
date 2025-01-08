import { validate } from "@/middleware/auth.ts";
import type { AuthService } from "@/services/auth-service.ts";
import { generateUserAuthTokens } from "@/services/jwt-service.ts";
import { parseZodError } from "@/utils/zod-errors.ts";
import type { Router } from "express";
import { z } from "zod";


export function loginUserRoute(router: Router, authService: AuthService) {
const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signin", async (req, res) => {
  const { success, data, error } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invalid fields",
      data: parseZodError(error),
      error: error?.flatten(),
    });
  }
  try {
    const loggedInUser = await authService.login(data);
    const {
      refreshToken: oldRefreshToken,
      password,
      verificationToken,
      ...publicUser
    } = loggedInUser;
    if (!loggedInUser.isEmailVerified) {
      res.status(400);
      return res.json({
        message: "user email not verified",
        data: publicUser,
      });
    }
    const { accessToken, refreshToken } = await generateUserAuthTokens(
      res,
      publicUser,
    );
    res.status(201);
    return res.json({
      message: "user logged in successfully",
      data: {
        accessToken,
        refreshToken,
        user: loggedInUser,
      },
    });
  } catch (err: any) {
    res.status(400);
    return res.json({
      message: "user login failed",
      error: err?.message,
    });
  }
});
  return router;
}
