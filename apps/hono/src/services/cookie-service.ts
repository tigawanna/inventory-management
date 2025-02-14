import type { Context } from "hono";
import type { CookieOptions } from "hono/utils/cookie";

import { deleteCookie, getCookie, setCookie } from "hono/cookie";

import type { AppBindings } from "@/lib/types";

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
  maxAge: 7 * 24 * 60 * 60, // expires in 7 days
} as const;

const accessTokencookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  expires: new Date(Date.now() + 12 * 60 * 1000), // expires in 12 minutes
  maxAge: 12 * 60, // expires in 12 minutes
} as const;

export const accessTokebCookieKey = "access";
export const refreshTokebCookieKey = "refresh";

export function setAccessTokenCookie(c: Context<AppBindings, "/", {}>, token: string) {
  setCookie(c, accessTokebCookieKey, token, accessTokencookieOptions);
}
export function clearAccessTokenCookie(jc: Context<AppBindings, "/", {}>) {
  deleteCookie(jc, accessTokebCookieKey, accessTokencookieOptions);
}
export function getAccessTokenFromCookieOrHeaders(c: Context<AppBindings, "/", {}>) {
  const headerToken = c.req.header("Authorization");
  const bearerAccessToken = headerToken?.split("Bearer")[1].trim();
  if (headerToken && bearerAccessToken && bearerAccessToken.length > 0) {
    return bearerAccessToken;
  }
  const cookieAccessToken = getCookie(c, accessTokebCookieKey);
  return cookieAccessToken;
}

export function setRefreshTokenCookie(jc: Context<AppBindings, "/", {}>, token: string) {
  // deleteCookie(jc, refreshTokebCookieKey);
  setCookie(jc, refreshTokebCookieKey, token, refreshCookieOptions);
}
export function clearRefreshTokenCookie(jc: Context<AppBindings, "/", {}>) {
  deleteCookie(jc, refreshTokebCookieKey, refreshCookieOptions);
}
export function getRefreshTokenFromCookie(jc: Context<AppBindings, "/", {}>) {
  const refreshToken = getCookie(jc, refreshTokebCookieKey);
  return refreshToken;
}

export function clearAllTokenCookie(c: Context<AppBindings, "/", {}>) {
  clearAccessTokenCookie(c);
  clearRefreshTokenCookie(c);
}
