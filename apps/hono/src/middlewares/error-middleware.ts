import type { Context } from "hono";
import type { HTTPResponseError } from "hono/types";

import { ZodError } from "zod";

import type { AppBindings } from "@/lib/types";

import { envVariables } from "@/env";
import HttpStatusCodes from "@/lib/status-codes";
import { parseZodError } from "@/lib/zod";

export async function onHonoError(
  err: Error | HTTPResponseError,
  c: Context<AppBindings, any, {}>,
) {
  const currentStatus = "status" in err ? err.status : c.newResponse(null).status;
  const statusCode
    = currentStatus !== HttpStatusCodes.OK
      ? (currentStatus as any | undefined)
      : HttpStatusCodes.INTERNAL_SERVER_ERROR;
  const env = envVariables.NODE_ENV;
  if (err instanceof ZodError) {
    return c.json({
      message: "invalid fields",
      data: parseZodError(err),
      error: err?.flatten(),
    });
  }
  return c.json(
    {
      message: err.message,
      stack: env === "production" ? undefined : err.stack,
      error: err.stack,
    },
    statusCode,
  );
}
