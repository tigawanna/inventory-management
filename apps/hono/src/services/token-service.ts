import type { Context } from "hono";

import { compare, hash } from "bcrypt";
import { sign, verify } from "hono/jwt";

import type { AppBindings } from "@/lib/types";
import type { UserJWTPayload } from "@/api/v1/users/schema";

import { envVariables } from "@/env";

import { verifyRefreshTokenAndrefreshAccessToken } from "../shared/utils/refresh-if-possible-util";
import {
  getAccessTokenFromCookieOrHeaders,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "./cookie-service";

export async function createAccessToken(
  c: Context<AppBindings, "/", {}>,
  payload: UserJWTPayload,
  superUser: boolean = false,
) {
  const { ACCESS_TOKEN_SECRET } = envVariables;
  const fiftenMinutesInSeconds = Math.floor(Date.now() / 1000) + 60 * 15; // 15 minutes
  const fiveDaysInSeconds = Math.floor(Date.now() / 1000) + 5 * 24 * 60 * 60; // 5 days
  const sanitizedPayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
    name: payload.name,
    refreshTokenVersion: payload.refreshTokenVersion,
  };
  const accessToken = await sign(
    {
      ...sanitizedPayload,
      exp: superUser ? fiveDaysInSeconds : fiftenMinutesInSeconds,
    },
    ACCESS_TOKEN_SECRET,
  );

  setAccessTokenCookie(c, accessToken);
  c.var.logger.info("createAccessToken: Access token created");
  return accessToken;
}

export async function createRefreshToken(
  c: Context<AppBindings, "/", {}>,
  payload: UserJWTPayload,
) {
  const { REFRESH_TOKEN_SECRET } = envVariables;
  // const { refreshTokenVersion } = await bumpUserTokenVersion(payload.id);
  const twelveDaysInSeconds = 12 * 24 * 60 * 60;
  const expriesin = Math.floor(Date.now() / 1000) + twelveDaysInSeconds;
  const sanitizedPayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
    name: payload.name,
    refreshTokenVersion: payload.refreshTokenVersion,
  };
  const refreshToken = await sign(
    { ...sanitizedPayload, exp: expriesin },
    REFRESH_TOKEN_SECRET,
  );
  setRefreshTokenCookie(c, refreshToken);
  c.var.logger.info("createRefreshToken: Refresh token created");
  return refreshToken;
}

export async function verifiedAccessToken(c: Context<AppBindings, "/", {}>) {
  const accessToken = getAccessTokenFromCookieOrHeaders(c);
  if (!accessToken) {
    c.var.logger.error("verifiedAccessToken : Missing access token");
    return;
  }
  const payload = await verify(accessToken, envVariables.ACCESS_TOKEN_SECRET);
  c.var.logger.info("verifiedAccessToken : Access token verified");
  return payload as UserJWTPayload;
}

export async function refreshAccessToken(c: Context<AppBindings, "/", {}>) {
  const refreshTokenPayload = await verifyRefreshTokenAndrefreshAccessToken(c);
  return refreshTokenPayload;
}

export async function generateUserAuthTokens(
  c: Context<AppBindings, "/", {}>,
  userPayload: UserJWTPayload,
  superUser: boolean = false,
) {
  const accessToken = await createAccessToken(c, userPayload, superUser);
  const refreshToken = await createRefreshToken(c, userPayload);
  c.var.logger.info("generateUserAuthTokens: Tokens generated");
  return { accessToken, refreshToken };
}

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}
