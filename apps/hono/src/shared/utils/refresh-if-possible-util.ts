import type { Context } from "hono";

import { verify } from "hono/jwt";

import type { AppBindings } from "@/lib/types";
import type { UserJWTPayload } from "@/api/users/schema";

import { envVariables } from "@/env";
import { errorCodes } from "@/schemas/shared-schema";

import {
  getRefreshTokenFromCookie,
} from "../../services/cookie-service";
import { findUserByID } from "../../services/user-auth-servoce";

export async function verifyRefreshTokenAndrefreshAccessToken(
  c: Context<AppBindings, "/", {}>,
  role: UserJWTPayload["role"] = "user",
) {
  const { REFRESH_TOKEN_SECRET } = envVariables;
  const refreshTtoken = getRefreshTokenFromCookie(c);
  if (!refreshTtoken) {
    c.var.logger.error("verifyRefreshToken: Missing refresh token");
    return {
      result: null,
      error: {
        error: "Unauthorized",
        message: "Missing credentials",
        code: errorCodes.loginRequired,
      },
    };
  }
  const refreshTokenPayload
    = (await verify(refreshTtoken, REFRESH_TOKEN_SECRET)) as UserJWTPayload;
  const matchingUser = await findUserByID(refreshTokenPayload.id);
  if (!matchingUser) {
    c.var.logger.error(
      `verifyRefreshToken: User ${refreshTokenPayload.id} not found`,
    );
    return {
      result: null,
      error: {
        error: "Unauthorized",
        message: "Invalid credentials",
        code: errorCodes.loginRequired,
      },
    };
  }
  // check for outdated refresh token
  if (
    matchingUser.refreshTokenVersion !== refreshTokenPayload.refreshTokenVersion
  ) {
    c.var.logger.error(
      `verifyRefreshToken: User ${matchingUser.id} has outdated refresh token version: ${matchingUser.refreshTokenVersion} != ${refreshTokenPayload.refreshTokenVersion}`,
    );
    return {
      result: null,
      error: {
        error: "Unauthorized",
        message: "Invalid credentials",
        code: errorCodes.loginRequired,
      },
    };
  }
  const { password, verificationToken, refreshToken, ...newuserPayload }
    = matchingUser;
  if (newuserPayload.role !== role) {
    c.var.logger.error(
      `verifyRefreshToken: User role does not match requested role: ${matchingUser.role} != ${role}`,
    );
    return {
      result: null,
      error: {
        error: "Unauthorized",
        message: "Invalid credentials",
        code: errorCodes.loginRequired,
      },
    };
  }
  // return { error: null, result: newuserPayload };

  return { result: { refreshTokenPayload }, error: null };
}
