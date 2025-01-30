import { createRoute, z } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import { AuthService } from "./auth-service";

const tags = ["Auth"];

export const resetPasswordRoute = createRoute({
  path: "/reset-password",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            token: z.string(),
            newPassword:z.string()
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: z.object({
          message: z.string(),
        }),
        error: z.null().optional(),
      }),
      "Password reset successful",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      baseResponseSchema.extend({
        result: z.null().optional(),
        error: z.object({
          code: z.string(),
          message: z.string(),
        }),
      }),
      "Password reset errorr : User not found",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Password reset validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Password reset internal error",
    ),
  },
});

export type ResetPasswordRoute = typeof resetPasswordRoute;

const authService = new AuthService();
export const resetPasswordHandler: AppRouteHandler<ResetPasswordRoute>
  = async (c) => {
    try {
      await authService.resetPassword(c.req.valid("json"));
      return c.json({
        result: {
          message: "Password reset successful",
        },
        error: null,
      }, HttpStatusCodes.OK);
    }
    catch (error) {
      if (error instanceof ZodError) {
        c.var.logger.error("Password reset error:", error.message);
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
        c.var.logger.error("Password reset internal error:", error.name);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof DrizzleError) {
        c.var.logger.error("Password reset drizzle error:", error);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      c.var.logger.error("Password reset internal error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: "Internal Server Error",
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
