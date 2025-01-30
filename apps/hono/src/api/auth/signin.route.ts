import { createRoute, z } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { userSigninSchema } from "@/schemas/auth.schema";
import { baseResponseSchema } from "@/schemas/shared-schema";

import { userJWTSchema, userSelectSchema } from "../users/schema";
import { MyAuthError } from "./auth-errors";
import { AuthService } from "./auth-service";

const tags = ["Auth"];

export const signinUserRoute = createRoute({
  path: "/signin",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: userSigninSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: userJWTSchema,
        error: z.null().optional(),
      }),
      "User signin successfully",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "User signin validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "User signin internal error",
    ),
  },
});

export type SigninRoute = typeof signinUserRoute;

const authService = new AuthService();
export const signinUserHandler: AppRouteHandler<SigninRoute> = async (c) => {
  try {
    const newUser = await authService.login(c.req.valid("json"));
    return c.json({
      result: newUser,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("User signin validation error:", error.message);
      return c.json({
        result: null,
        error: {
          code: "parameters-required",
          message: error.message,
          data: returnValidationData(error),
        } as const,
      }, HttpStatusCodes.BAD_REQUEST);
    }
    if (error instanceof MyAuthError) {
      c.var.logger.error("User signin internal error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "parameters-required",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof Error) {
      c.var.logger.error("User signin error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof DrizzleError) {
      c.var.logger.error("User signin drizzle error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("User signin internal error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
