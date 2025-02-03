import { createRoute, z } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { userSignupSchema } from "@/schemas/auth.schema";
import { baseResponseSchema } from "@/schemas/shared-schema";

import { userJWTSchema } from "../users/schema";
import { MyAuthError } from "./auth-errors";
import { AuthService } from "./auth-service";

const tags = ["Auth"];

export const signupUserRoute = createRoute({
  path: "/signup",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: userSignupSchema,
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
      "User signup successfully",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      baseResponseSchema,
      "User signup not found error",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "User signup validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "User signup internal error",
    ),
  },
});

export type SignupRoute = typeof signupUserRoute;

const authService = new AuthService();
export const signupUserHandler: AppRouteHandler<SignupRoute> = async (c) => {
  try {
    const newUser = await authService.register(c.req.valid("json"));
    if (!newUser) {
      return c.json({
        result: null,
        error: {
          code: "not-found",
          message: "User not found",
        } as const,
      }, HttpStatusCodes.NOT_FOUND);
    }
    return c.json({
      result: newUser,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof MyAuthError) {
      c.var.logger.error("User signup internal error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof ZodError) {
      c.var.logger.error("User signup error:", error.message);
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
      c.var.logger.error("User signup internal inventory error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof DrizzleError) {
      c.var.logger.error("User signup drizzle error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("User signup internal error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
