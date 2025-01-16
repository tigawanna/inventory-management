import { envVariables } from "@/env";
import { AppBindings } from "@/lib/types";
import { UserJWTPayload } from "@/routes/users/schema";
import { clearAccessTokenCookie, getAccessTokenFromCookieOrHeaders, setAccessTokenCookie } from "@/services/cookie-service";
import { Context, Next } from "hono";

export function authenticateUserMiddleware(c: Context<AppBindings, "/", {}>, next: Next) {
  const htoken = getAccessTokenFromCookieOrHeaders(c);
  console.log("===  htoken ====", htoken?.length);
  next();
}

