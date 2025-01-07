import express from "express";
import { z } from "zod";
import { AuthService } from "@/services/auth-service.ts";
import { generateUserAuthTokens } from "@/services/jwt-service.ts";

const router = express.Router();
const authService = new AuthService();
const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signin", async (req, res) => {
  const { success, data, error } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invalid fields",
      error: error.flatten(),
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
    console.log("== error ===", err);
    res.status(400);
    res.json({
      message: "user login failed",
      error: err?.message,
    });
  }
});

export default router;
