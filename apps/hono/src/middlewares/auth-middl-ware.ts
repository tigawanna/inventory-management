import type { Context, Next } from "hono";

import type { AppBindings } from "@/lib/types";

import { getAccessTokenFromCookieOrHeaders } from "@/services/cookie-service";

export function authenticateUserMiddleware(c: Context<AppBindings, "/", {}>, next: Next) {
  const token = getAccessTokenFromCookieOrHeaders(c);
  next();
}
