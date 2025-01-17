import type { Context, Next } from "hono";

import { sign } from "hono/jwt";

import type { UserJWTPayload } from "@/api/v1/users/schema";
import type { AppBindings } from "@/lib/types";

import { envVariables } from "@/env";
import {
  setAccessTokenCookie,
} from "@/services/cookie-service";
import { verifiedAccessToken } from "@/services/token-service";
import { verifyRefreshTokenAndrefreshAccessToken } from "@/shared/utils/refresh-if-possible-util";

export async function authenticateUserMiddleware(
  c: Context<AppBindings, "/", {}>,
  next: Next,
  role?: UserJWTPayload["role"],
) {
  const user = await verifiedAccessToken(c);
  // invalid or no accessoken
  if (!user) {
    const refreshTokenPresent = await verifyRefreshTokenAndrefreshAccessToken(
      c,
      role,
    );
    if (refreshTokenPresent.error) {
      return c.json({
        error: refreshTokenPresent.error,
      });
    }
    if (refreshTokenPresent.result) {
      const { ACCESS_TOKEN_SECRET } = envVariables;
      const newAccessToken = await sign(
        refreshTokenPresent.result.refreshTokenPayload,
        ACCESS_TOKEN_SECRET,
      );
      setAccessTokenCookie(c, newAccessToken);
      c.var.logger.info("refreshAccessToken: Access token refreshed");
    }

    return c.json({
      error: {
        error: "Unauthorized",
        message: "Missing credentials",
        code: 401,
      },
    });
  }
  if (role && role !== user.role) {
    return c.json({
      error: {
        error: "Unauthorized",
        message: "Missing credentials",
        code: 401,
      },
    });
  }
  next();
}
