import type { Context, Next } from "hono";

import { getConnInfo } from '@hono/node-server/conninfo'

import type { AppBindings } from "@/lib/types";

import { envVariables } from "@/env";

export const allowedOrigins = [
  "http://localhost:3000",
  envVariables.FRONTEND_URL ?? "",
];

export function corsHeaders(c: Context<AppBindings, "/", {}>, next: Next) {
    const originHeaders = c.req.header("Origin")
    // c.var.logger.info(`corsHeaders: ${originHeaders}`)
  if (!originHeaders)
    return next();
  if (allowedOrigins.includes(originHeaders)) {
    c.header("Access-Control-Allow-Origin", originHeaders);
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  }
  return next();
}
