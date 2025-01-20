import type { Context, Next } from "hono";

import type { AppBindings } from "@/lib/types";

import { envVariables } from "@/env";

export const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  envVariables.FRONTEND_URL ?? "",
];

export function corsHeaders(c: Context<AppBindings, "/", {}>, next: Next) {
  // const originHeaders = c.req.header("Origin");
  const requestUrl = new URL(c.req.raw.url)
  const requestOrigin = requestUrl.origin
  // c.var.logger.info(`corsHeaders: ${originHeaders}`)
  if (!requestOrigin)
    return next();
  if (allowedOrigins.includes(requestOrigin)) {
    c.header("Access-Control-Allow-Origin", requestOrigin);
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
   return next();
  }
  return next();
}
