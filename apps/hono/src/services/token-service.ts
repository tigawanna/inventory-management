import { AppBindings } from "@/lib/types";
import { Context } from "hono";
import { sign, verify } from "hono/jwt";
import { compare, hash } from "bcrypt";
import {
  getAccessTokenFromCookieOrHeaders,
  getRefreshTokenFromCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "./cookie-service";
import { envVariables } from "@/env";
import { UserJWTPayload } from "@/routes/users/schema";
import { errorCodes } from "@/shared/schema";
import { findUserByID } from "./user-auth-servoce";


export async function createAccessToken(
  c: Context<AppBindings, "/", {}>,
  payload: UserJWTPayload,
  superUser: boolean = false
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
    ACCESS_TOKEN_SECRET
  );

  setAccessTokenCookie(c, accessToken);
  c.var.logger.info("createAccessToken: Access token created");
  return accessToken;
}

export async function createRefreshToken(
  c: Context<AppBindings, "/", {}>,
  payload: UserJWTPayload
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
  const refreshToken = await sign({ ...sanitizedPayload, exp: expriesin }, REFRESH_TOKEN_SECRET);
  setRefreshTokenCookie(c, refreshToken);
  c.var.logger.info("createRefreshToken: Refresh token created");
  return refreshToken;
}

export async function verifyRefreshToken(c: Context<AppBindings, "/", {}>) {
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
  const refreshTokenPayload = (await verify(refreshTtoken, REFRESH_TOKEN_SECRET)) as UserJWTPayload;
  const matchingUser = await findUserByID(refreshTokenPayload.id);
  if (!matchingUser) {
    c.var.logger.error(`verifyRefreshToken: User ${refreshTokenPayload.id} not found`);
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
  if (matchingUser.refreshTokenVersion !== refreshTokenPayload.refreshTokenVersion) {
    c.var.logger.error(
      `verifyRefreshToken: User ${matchingUser.id} has outdated refresh token version: ${matchingUser.refreshTokenVersion} != ${refreshTokenPayload.refreshTokenVersion}`
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
  const { password, verificationToken, refreshToken, ...newuserPayload } = matchingUser;
  return { error: null, result: newuserPayload };
}

export async function verifiedAccessToken(c: Context<AppBindings, "/", {}>) {
  try {
    const accessToken = getAccessTokenFromCookieOrHeaders(c);
    if (!accessToken) {
      c.var.logger.error("verifyAccessToken: Missing access token");
      return;
    }
    const payload = await verify(accessToken, envVariables.ACCESS_TOKEN_SECRET)
    c.var.logger.info("verifyAccessToken: Access token verified");
    return payload as UserJWTPayload;
  } catch (error) {
    c.var.logger.error("verifyAccessToken: Invalid access token");
    return;
  }
}

export async function refreshAccessToken(c: Context<AppBindings, "/", {}>) {
  const refreshTokenPayload = await verifyRefreshToken(c);
  if (!refreshTokenPayload) return;
  const { ACCESS_TOKEN_SECRET } = envVariables;
  const newAccessToken = await sign(refreshTokenPayload, ACCESS_TOKEN_SECRET);
  c.var.logger.info("refreshAccessToken: Access token refreshed");
  return newAccessToken;
}

export async function generateUserAuthTokens(
  c: Context<AppBindings, "/", {}>,
  userPayload: UserJWTPayload,
  superUser: boolean = false
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
