import type { Context } from "hono";

import { sign, verify } from "hono/jwt";

import type { AppBindings } from "@/lib/types";
import type { UserJWTPayload } from "@/routes/users/schema";

import { envVariables } from "@/env";
import { errorCodes } from "@/shared/schema";

import { getRefreshTokenFromCookie, setAccessTokenCookie } from "./cookie-service";
import { findUserByID } from "./user-auth-servoce";

export async function verifyRefreshTokenAndrefreshAccessToken(
  c: Context<AppBindings, "/", {}>,
  role: UserJWTPayload["role"]="user",
) {
  const { REFRESH_TOKEN_SECRET } = envVariables;
  const refreshTtoken = getRefreshTokenFromCookie(c);
  if (!refreshTtoken) {
    c.var.logger.error("verifyRefreshToken: Missing refresh token");
    return c.json({
      result: null,
      error: {
        error: "Unauthorized",
        message: "Missing credentials",
        code: errorCodes.loginRequired,
      },
    });
  }
  const refreshTokenPayload =
    (await verify(refreshTtoken, REFRESH_TOKEN_SECRET)) as UserJWTPayload;
  const matchingUser = await findUserByID(refreshTokenPayload.id);
  if (!matchingUser) {
    c.var.logger.error(
      `verifyRefreshToken: User ${refreshTokenPayload.id} not found`,
    );
    return c.json({
      result: null,
      error: {
        error: "Unauthorized",
        message: "Invalid credentials",
        code: errorCodes.loginRequired,
      },
    });
  }
  // check for outdated refresh token
  if (
    matchingUser.refreshTokenVersion !== refreshTokenPayload.refreshTokenVersion
  ) {
    c.var.logger.error(
      `verifyRefreshToken: User ${matchingUser.id} has outdated refresh token version: ${matchingUser.refreshTokenVersion} != ${refreshTokenPayload.refreshTokenVersion}`,
    );
    return c.json({
      result: null,
      error: {
        error: "Unauthorized",
        message: "Invalid credentials",
        code: errorCodes.loginRequired,
      },
    });
  }
  const { password, verificationToken, refreshToken, ...newuserPayload } =
    matchingUser;
  if (newuserPayload.role !== role) {
    c.var.logger.error(
      `verifyRefreshToken: User role does not match requested role: ${matchingUser.role} != ${role}`,
    );
    return c.json({
      result: null,
      error: {
        error: "Unauthorized",
        message: "Invalid credentials",
        code: errorCodes.loginRequired,
      },
    });
  }
  // return { error: null, result: newuserPayload };
  const { ACCESS_TOKEN_SECRET } = envVariables;
  const newAccessToken = await sign(refreshTokenPayload, ACCESS_TOKEN_SECRET);
  c.var.logger.info("refreshAccessToken: Access token refreshed");
  setAccessTokenCookie(c, newAccessToken);
  c.var.logger.info("refreshAccessToken: Access token set in cookie");
  return {newAccessToken, refreshTokenPayload};
}
