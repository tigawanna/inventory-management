import { authenticate } from "@/middleware/auth.ts";
import { errorCodes } from "@/schemas/shared-schema.ts";
import type { AuthService } from "@/services/auth-service.ts";
import {
  clearAccessTokenCookie,
  clearRefreshTokenCookie,
  generateUserAuthTokens,
  verifyRefreshToken,
} from "@/services/jwt-service.ts";
import { parseZodError } from "@/utils/zod-errors.ts";
import type { Router } from "express";
import { z } from "zod";


export function requestEmailVerificayionRoute(router: Router, authService: AuthService) {
  const registerSchema = z.object({
    email: z.string().email(),
  });

  router.post("/request-email-verification", async (req, res) => {
    const { success, data, error } = registerSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "invalid fields",
        data: parseZodError(error),
        error: error?.flatten(),
      });
    }
    try {
      const createdUser = await authService.requestVerifyEmail(data.email);
      res.status(201);
      res.json({
        message: "verification email sent",
        data: createdUser,
      });
    } catch (err: any) {
      res.status(400);
      res.json({
        message: "Email verification failed",
        error: err?.message,
      });
    }
  });
  return router;
}


export function verifyEmailRoute(router: Router, authService: AuthService) {
  const verifyQuerySchema = z.object({
    token: z.string().min(1).optional(),
    email: z.string().email().optional(),
  });

  router.post("/verify-email", async (req, res) => {
    const { success, data, error } = verifyQuerySchema.safeParse(req.query);
    if (!success) {
      return res.status(400).json({
        message: "invalid fields",
        data: parseZodError(error),
        error: error?.flatten(),
      });
    }
    try {
      const verifiedUser = await authService.verifyEmail(
        data.token,
        data.email,
      );
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
    try {
      const user = await authService.getUser(req.user.id);
      // const tokens = await generateUserAuthTokens(res, user);
      res.status(200);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message,
          message: "user not found",
          code: errorCodes.loginRequired,
        });
      }
      return res.json({
        error,
        message: "user not found",
        code: errorCodes.loginRequired,
      });
    }
  });
}

export function refreshTokenRoute(router: Router, authService: AuthService) {
  router.get("/refresh-token", async (req, res) => {
    try {
      const user = await verifyRefreshToken(req, res);
      if(user.error) {
        return res.status(403).json(user.error);
      }
      const { accessToken, refreshToken } = await generateUserAuthTokens(
        res,
        user.result,
      );
      res.status(200);
      return res.json({ user, accessToken, refreshToken });
    } catch (error) {
      res.status(400);
      if (error instanceof Error) {
        return res.json({
          error: error.message,
          message: "refreshing token failed",
          action: "login",
        });
      }
      return res.json({
        error,
        message: "refreshing token failed",
        action: "login",
      });
    }
  });
}

export function logoutRoute(router: Router, authService: AuthService) {
  router.post("/logout", authenticate, async (req, res) => {
   try {
     // Clear cookies first
     await clearAccessTokenCookie(res);
     await clearRefreshTokenCookie(res, req.user.id);
     // Clear user
     // @ts-expect-error
     req.user = undefined;

     // Send single response
     return res.status(200).json({ message: "user logged out" });
   } catch (error) {
     return res.status(400).json({
       message: "logout failed",
       error: error instanceof Error ? error.message : error,
     });
   }
  });
}
