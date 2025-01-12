import { envVariables } from "@/env.ts";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import type { CookieOptions, Response, Request } from "express";
import { bumpUserTokenVersion, findUserByID } from "./user-auth-servoce.ts";
import { type UserJWTPayload } from "@/schemas/user-schema.ts";
import { compare, hash } from "bcrypt";
import { errorCodes } from "@/schemas/shared-schema.ts";

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
  // maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
} as const;

const accessTokencookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  expires: new Date(Date.now() + 12 * 60 * 1000), // expires in 12 minutes
  // maxAge: 12 * 60 * 1000, // expires in 12 minutes
} as const;

const accessTokebCookieKey = "jwt";
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

export async function createAccessToken(
  res: Response,
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
  const { expires, ...clearCookieOptions } = accessTokencookieOptions;
  res.clearCookie(accessTokebCookieKey, clearCookieOptions);
  res.cookie(accessTokebCookieKey, accessToken, accessTokencookieOptions);
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
  //   setCookie(c, refreshTokebCookieKey, refreshToken, { path: "/", httpOnly: true });
  const { expires, ...clearCookieOptions } = refreshCookieOptions;
  res.clearCookie(refreshTokebCookieKey, clearCookieOptions);
  res.cookie(refreshTokebCookieKey, refreshToken, refreshCookieOptions);
  return refreshToken;
}

export async function verifyRefreshToken(req: Request, res: Response) {
  const { REFRESH_TOKEN_SECRET } = envVariables;
  const refreshTtoken = req.cookies?.[refreshTokebCookieKey];
  if (!refreshTtoken) {
    // const { expires, ...clearCookieOptions } = refreshCookieOptions;
    // res.clearCookie(refreshTokebCookieKey, clearCookieOptions);
    // res.status(401);
    // res.json({
    //   error: "Unauthorized",
    //   message: "Missing credentials",
    //   code: errorCodes.loginRequired,
    // });
    return {
      result: null,
      error: {
        error: "Unauthorized",
        message: "Missing credentials",
        code: errorCodes.loginRequired,
      },
    };
  }
  const refreshTokenPayload = (await verify(
    refreshTtoken,
    REFRESH_TOKEN_SECRET,
  )) as UserJWTPayload;
  const matchingUser = await findUserByID(refreshTokenPayload.id);

  if (!matchingUser) {
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
    console.log("invalid refesh token ", matchingUser);
    return {
      result: null,
      error: {
        error: "Unauthorized",
        message: "Invalid credentials",
        code: errorCodes.loginRequired,
      },
    };
  }
  const { password, verificationToken, refreshToken, ...newuserPayload } =
    matchingUser;
  return { error: null, result: newuserPayload };
}

export async function verifyAccessToken(accesToken: string) {
  try {
    const payload = await verify(accesToken, envVariables.ACCESS_TOKEN_SECRET);
    return payload as UserJWTPayload;
  } catch (error) {
    return;
  }
}

/**
 * Verifies the refresh token stored in the request cookie,
 * and returns a new access token if the refresh token is valid.
 * @param req Express request object
 * @param res Express response object
 * @param payload The payload to sign for the new access token
 * @returns The new access token
 */
export async function refreshAccessToken(req: Request, res: Response) {
  const refreshTokenPayload = await verifyRefreshToken(req, res);
  if (!refreshTokenPayload) return;
  const { ACCESS_TOKEN_SECRET } = envVariables;
  const newAccessToken = await sign(refreshTokenPayload, ACCESS_TOKEN_SECRET);
  return newAccessToken;
}


// export async function invalidateRefreshToken(req: Request, res: Response) {
//   const refreshTokenPayload = await verifyRefreshToken(req, res);
//   if (!refreshTokenPayload) return;
//   if (refreshTokenPayload.result) {
//     await bumpUserTokenVersion(refreshTokenPayload.result.id);
//     res.clearCookie(refreshTokebCookieKey, refreshCookieOptions);
//   }
// }



export async function generateUserAuthTokens(
  res: Response,
  userPayload: UserJWTPayload,
  superUser: boolean = false,
) {
  const accessToken = await createAccessToken(res, userPayload, superUser);
  const refreshToken = await createRefreshToken(res, userPayload);
  return { accessToken, refreshToken };
}

export async function clearAccessTokenCookie(res: Response) {
  const { expires, ...clearCookieOptions } = accessTokencookieOptions;
  res.clearCookie(accessTokebCookieKey, clearCookieOptions);
}
export async function clearRefreshTokenCookie(res: Response, userid: string) {
  await bumpUserTokenVersion(userid);
  const { expires, ...clearCookieOptions } = refreshCookieOptions;
  res.clearCookie(refreshTokebCookieKey, clearCookieOptions);
}
export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export function isRefreshTokenCokkiePresent(req: Request) {
  return req.cookies?.[refreshTokebCookieKey] ? true : false;
}

export async function getAccessTokenFromCokkieOrHeaders(req: Request) {
  try {
    const beareToken = req.headers.authorization?.split(" ")[1];
    if (beareToken && beareToken.length > 0) {
      return await verifyAccessToken(beareToken);
    }
    const cookieToekn = req.cookies?.[accessTokebCookieKey];
    if (cookieToekn && cookieToekn.length > 0) {
      return await verifyAccessToken(cookieToekn);
    }
    return;
  } catch (error) {
    return;
  }
}
