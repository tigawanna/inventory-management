import type { Context } from "hono";

import { compare, hash } from "bcrypt";
import { getContext } from "hono/context-storage";
import { sign, verify } from "hono/jwt";

import type { UserJWTPayload } from "@/api/users/schema";
import type { AppBindings } from "@/lib/types";

import { envVariables } from "@/env";

import { verifyRefreshTokenAndrefreshAccessToken } from "../shared/utils/refresh-if-possible-util";
import {
  clearAllTokenCookie,
  getAccessTokenFromCookieOrHeaders,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "./cookie-service";

export async function createAccessToken(
  payload: UserJWTPayload,
  superUser: boolean = false,
) {
  const c = getContext<AppBindings>();
  const { ACCESS_TOKEN_SECRET } = envVariables;
  const fiftenMinutesInSeconds = Math.floor(Date.now() / 1000) + 60 * 15; // 15 minutes
  const fiveDaysInSeconds = Math.floor(Date.now() / 1000) + 5 * 24 * 60 * 60; // 5 days

  const accessToken = await sign(
    {
      ...payload,
      exp: superUser ? fiveDaysInSeconds : fiftenMinutesInSeconds,
    },
    ACCESS_TOKEN_SECRET,
  );

  setAccessTokenCookie(c, accessToken);
  c.var.logger.info("createAccessToken: Access token created");
  return accessToken;
}

export async function createRefreshToken(
  payload: UserJWTPayload,
) {
  const c = getContext<AppBindings>();
  const { REFRESH_TOKEN_SECRET } = envVariables;
  // const { refreshTokenVersion } = await bumpUserTokenVersion(payload.id);
  const twelveDaysInSeconds = 12 * 24 * 60 * 60;
  const expriesin = Math.floor(Date.now() / 1000) + twelveDaysInSeconds;

  const refreshToken = await sign(
    { ...payload, exp: expriesin },
    REFRESH_TOKEN_SECRET,
  );
  setRefreshTokenCookie(c, refreshToken);
  c.var.logger.info("createRefreshToken: Refresh token created");
  return refreshToken;
}

export async function verifiedAccessToken() {
  const c = getContext<AppBindings>();
  const accessToken = getAccessTokenFromCookieOrHeaders(c);
  if (!accessToken) {
    c.var.logger.error("verifiedAccessToken : Missing access token");
    return;
  }
  const payload = await verify(accessToken, envVariables.ACCESS_TOKEN_SECRET);
  c.var.logger.info("verifiedAccessToken : Access token verified");
  return payload as UserJWTPayload;
}

export async function refreshAccessToken() {
  const c = getContext<AppBindings>();
  const refreshTokenPayload = await verifyRefreshTokenAndrefreshAccessToken(c);
  return refreshTokenPayload;
}

export async function generateUserAuthTokens(
  userPayload: UserJWTPayload,
  superUser: boolean = false,
) {
  const c = getContext<AppBindings>();
  const accessToken = await createAccessToken(userPayload, superUser);
  const refreshToken = await createRefreshToken(userPayload);
  c.var.logger.info("generateUserAuthTokens: Tokens generated");
  return { accessToken, refreshToken };
}

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function clearTokens() {
  const c = getContext<AppBindings>();
  clearAllTokenCookie(c);
}
