import { envVariables } from "@/env.ts";
import { sign, verify } from "jsonwebtoken";
import type { CookieOptions, Response, Request } from "express";
import { bumpUserTokenVersion, findUserByID } from "./user-servoce.ts";
import { type UserJWTPayload } from "@/schemas/user-schema.ts";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  path: "/",
} as const;

const refreshTokebCookieKey = "kjz-rft";

/**
 * Generates an access token for a user.
 *
 * This function creates a new access token for the user based on the given payload.
 * The token is signed with the access token secret key and includes an expiration
 * time set to 1 minute from the current time.
 *
 * @param payload - The payload containing user data for token generation.
 * @returns The generated access token.
 */

export async function createAccessToken(payload: UserJWTPayload) {
  const { ACCESS_TOKEN_SECRET } = envVariables;
  const expriesin = Math.floor(Date.now() / 1000) + 30 * 2;
  const accessToken = await sign(
    { ...payload, exp: expriesin },
    ACCESS_TOKEN_SECRET,
  );
  return accessToken;
}

/**
 * Generates a refresh token for a user and sets it as a cookie on the response object.
 *
 * This function creates a new refresh token for the user using their payload and refresh token version.
 * The token is signed with the secret key and is set to expire in 12 days.
 * The refresh token is then set as an HTTP-only cookie on the response object.
 *
 * @param res - Express response object used to set the refresh token cookie.
 * @param payload - The payload containing user data for token generation, including the user's ID.
 * @returns The generated refresh token.
 */

export async function createRefreshToken(
  res: Response,
  payload: UserJWTPayload,
) {
  const { REFRESH_TOKEN_SECRET } = envVariables;
  const { refreshTokenVersion } = await bumpUserTokenVersion(payload.id);
  const twelveDaysInSeconds = 5 * 24 * 60 * 60;
  const expriesin = Math.floor(Date.now() / 1000) + twelveDaysInSeconds;
  const refreshToken = await sign(
    { ...payload, refreshTokenVersion, exp: expriesin },
    REFRESH_TOKEN_SECRET,
  );
  //   setCookie(c, refreshTokebCookieKey, refreshToken, { path: "/", httpOnly: true });
  res.cookie(refreshTokebCookieKey, refreshToken, cookieOptions);
  return refreshToken;
}

/**
 * Verifies the refresh token stored in the request cookie, and returns the verified payload.
 * @param req Express request object
 * @param res Express response object
 * @returns The verified refresh token payload
 * @throws {JsonWebTokenError} If the refresh token is invalid
 * @throws {Response} If the refresh token is not found or outdated, with status 401 or 403 respectively
 */
export async function verifyRefreshToken(req: Request, res: Response) {
  const { REFRESH_TOKEN_SECRET } = envVariables;
  const refreshTtoken = req.cookies.kjz;
  if (!refreshTtoken) {
    res.clearCookie(refreshTokebCookieKey, cookieOptions);
    res.status(401);
    return res.json({
      error: "Unauthorized",
      message: "Missing credentials",
    });
  }
  const refreshTokenPayload = (await verify(
    refreshTtoken,
    REFRESH_TOKEN_SECRET,
  )) as UserJWTPayload;
  const matchingUser = await findUserByID(refreshTokenPayload.id);
  // check for outdated refresh token
  if (
    !matchingUser ||
    matchingUser.refreshTokenVersion !== refreshTokenPayload.refreshTokenVersion
  ) {
    res.clearCookie(refreshTokebCookieKey, cookieOptions);
    res.status(403);
    return res.json({
      error: "Unauthorized",
      message: "Invalid credentials",
    });
  }
  return refreshTokenPayload;
}

export async function verifyAccessToken(accesToken: string) {
  const payload = await verify(accesToken, envVariables.ACCESS_TOKEN_SECRET);
  return payload;
}

/**
 * Verifies the refresh token stored in the request cookie,
 * and returns a new access token if the refresh token is valid.
 * @param req Express request object
 * @param res Express response object
 * @param payload The payload to sign for the new access token
 * @returns The new access token
 */
export async function refreshAccessToken(
  req: Request,
  res: Response,
  payload: UserJWTPayload,
) {
  await verifyRefreshToken(req, res);
  const { ACCESS_TOKEN_SECRET } = envVariables;
  const newAccessToken = await sign(payload, ACCESS_TOKEN_SECRET);
  return newAccessToken;
}

/**
 * Invalidates the refresh token stored in the request cookie, by bumping the user's refreshTokenVersion in the database and clearing the cookie.
 * @param req Express request object
 * @param res Express response object
 */
export async function invalidateRefreshToken(req: Request, res: Response) {
  const refreshTokenPayload = await verifyRefreshToken(req, res);
  if ("id" in refreshTokenPayload && "tokenVerion" in refreshTokenPayload) {
    await bumpUserTokenVersion(refreshTokenPayload.id);
    res.clearCookie(refreshTokebCookieKey, cookieOptions);
  }
}

/**
 * Generates authentication tokens (access token and refresh token) for a user on Signup.
 *
 * This function creates a new access token and refresh token for the user
 * specified in the `userPayload`, and sets the refresh token as a cookie
 * on the response object `res`.
 *
 * @param req - Express response object (incorrectly typed as Response)
 * @param res - Express response object to set the refresh token cookie
 * @param userPayload - The payload containing user data for token generation
 * @returns An object containing the generated access token and refresh token
 */

export async function generateUserAuthTokens(
  req: Response,
  res: Response,
  userPayload: UserJWTPayload,
) {
  const accessToken = await createAccessToken(userPayload);
  const refreshToken = await createRefreshToken(res, userPayload);
  return { accessToken, refreshToken };
}
