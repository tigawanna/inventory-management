import { createRoute, z } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { userSigninSchema } from "@/schemas/auth.schema";
import { baseResponseSchema } from "@/schemas/shared-schema";
import {
  accessTokebCookieKey,
  refreshTokebCookieKey,
} from "@/services/cookie-service";
import { verifiedAccessToken } from "@/services/token-service";

import { userJWTSchema } from "../users/schema";


const tags = ["Auth"];

export const currentUserRoute = createRoute({
  path: "/me",
  method: "get",
  tags,
  request: {
    cookies: z.object({
      [accessTokebCookieKey]: z.string(),
      [refreshTokebCookieKey]: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: userJWTSchema,
        error: z.null().optional(),
      }),
      "Current user successfully",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      baseResponseSchema,
      "Current user not found error",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Current user validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Current user internal error",
    ),
  },
});

export type CurrentUserRoute = typeof currentUserRoute;

export const currentUserHandler: AppRouteHandler<CurrentUserRoute> = async (c,
) => {
  try {
    const newUser = await verifiedAccessToken();
    if (!newUser) {
      return c.json({
        result: null,
        error: {
          message: "Login required",
        },
      }, HttpStatusCodes.NOT_FOUND);
    }
    return c.json({
      result: newUser,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("Current user validation error:", error.message);
      return c.json({
        result: null,
        error: {
          code: "parameters-required",
          message: error.message,
          data: returnValidationData(error),
        } as const,
      }, HttpStatusCodes.BAD_REQUEST);
    }
    if (error instanceof Error) {
      c.var.logger.error("Current user internal error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof DrizzleError) {
      c.var.logger.error("Current user drizzle error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("Current user internal error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
